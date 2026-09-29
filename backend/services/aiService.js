const { SYSTEM_PROMPT, buildAnalysisPrompt } = require('../utils/promptTemplates');

/**
 * Analyzes resume against job description using Gemini AI, with automatic heuristic fallback if API key is not present.
 */
async function generateResumeAnalysis(resumeText, jobDescription, jobTitle = '', companyName = '') {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      console.log('[AI Service] Calling Gemini API...');
      return await callGeminiApi(apiKey, resumeText, jobDescription, jobTitle, companyName);
    } catch (err) {
      console.error('[AI Service] Gemini API call failed, falling back to intelligent rule engine:', err.message);
      return runHeuristicAnalysis(resumeText, jobDescription, jobTitle, companyName);
    }
  } else {
    console.log('[AI Service] GEMINI_API_KEY not set. Running intelligent local analysis engine...');
    return runHeuristicAnalysis(resumeText, jobDescription, jobTitle, companyName);
  }
}

/**
 * Call Google Gemini API
 */
async function callGeminiApi(apiKey, resumeText, jobDescription, jobTitle, companyName) {
  let GoogleGenAI;
  try {
    const genAiPkg = require('@google/genai');
    GoogleGenAI = genAiPkg.GoogleGenAI;
  } catch (e) {
    // Fallback import
    const genAiPkg = require('@google/generative-ai');
    GoogleGenAI = genAiPkg.GoogleGenerativeAI;
  }

  const prompt = buildAnalysisPrompt(resumeText, jobDescription, jobTitle, companyName);

  let rawResponseText = '';

  if (GoogleGenAI.prototype && GoogleGenAI.prototype.getGenerativeModel) {
    // Standard @google/generative-ai SDK
    const genAI = new GoogleGenAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });
    const result = await model.generateContent(prompt);
    rawResponseText = result.response.text();
  } else {
    // New @google/genai SDK
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2
      }
    });
    rawResponseText = response.text;
  }

  // Parse JSON from output
  return cleanAndParseJsonResponse(rawResponseText);
}

/**
 * Cleans markdown backticks and parses JSON safely
 */
function cleanAndParseJsonResponse(responseText) {
  let cleaned = responseText.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('[AI Service] Failed to parse JSON response. Attempting regex extract...');
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('AI response was not valid JSON');
  }
}

/**
 * Intelligent fallback heuristic engine for offline / keyless execution
 */
function runHeuristicAnalysis(resumeText, jobDescription, jobTitle = '', companyName = '') {
  const rText = resumeText.toLowerCase();
  const jText = jobDescription.toLowerCase();

  // Standard tech dictionary
  const techKeywords = [
    'javascript', 'typescript', 'react', 'node.js', 'express', 'mongodb', 'sql', 'postgres',
    'python', 'java', 'c++', 'html', 'css', 'tailwind', 'git', 'github', 'docker', 'aws',
    'azure', 'rest api', 'graphql', 'ci/cd', 'agile', 'scrum', 'jira', 'unit testing',
    'jest', 'redux', 'next.js', 'vue', 'angular', 'system design', 'microservices', 'linux'
  ];

  const matchedSkills = [];
  const missingSkills = [];
  const matchedKw = [];
  const missingKw = [];

  techKeywords.forEach(kw => {
    const inJob = jText.includes(kw);
    const inResume = rText.includes(kw);

    if (inJob && inResume) {
      matchedSkills.push(capitalizeWord(kw));
      matchedKw.push(capitalizeWord(kw));
    } else if (inJob && !inResume) {
      missingSkills.push(capitalizeWord(kw));
      missingKw.push(capitalizeWord(kw));
    } else if (inResume) {
      matchedSkills.push(capitalizeWord(kw));
    }
  });

  // Calculate scores based on keyword match ratio
  const totalJobKw = matchedKw.length + missingKw.length;
  const matchRatio = totalJobKw > 0 ? (matchedKw.length / totalJobKw) : 0.7;

  const skillsScore = Math.min(98, Math.max(45, Math.round(matchRatio * 100)));
  const experienceScore = Math.min(95, Math.max(50, Math.round(matchRatio * 85 + 10)));
  const educationScore = rText.includes('bachelor') || rText.includes('degree') || rText.includes('university') || rText.includes('computer science') ? 90 : 75;
  
  // Check formatting issues
  const atsIssues = [];
  if (!rText.includes('experience') && !rText.includes('work') && !rText.includes('employment')) {
    atsIssues.push({
      severity: 'critical',
      category: 'Section Headings',
      issue: 'Standard "Work Experience" heading missing or non-standard.',
      solution: 'Use clear headings like "Work Experience" or "Professional Experience".'
    });
  }
  if (!rText.includes('education')) {
    atsIssues.push({
      severity: 'warning',
      category: 'Section Headings',
      issue: 'Standard "Education" heading missing.',
      solution: 'Include an explicit "Education" section with degree, field, and year.'
    });
  }
  if (rText.length < 500) {
    atsIssues.push({
      severity: 'warning',
      category: 'Content Length',
      issue: 'Resume text is under 500 characters, which may lack necessary detail for ATS scanners.',
      solution: 'Expand on projects, responsibilities, and technical skills.'
    });
  }
  if (atsIssues.length === 0) {
    atsIssues.push({
      severity: 'info',
      category: 'ATS Parsing',
      issue: 'Good basic document structure detected.',
      solution: 'Ensure simple single-column layout without tables or graphics for optimal ATS ingestion.'
    });
  }

  const atsScore = Math.max(65, 100 - (atsIssues.length * 10));
  const overallScore = Math.round((skillsScore * 0.4) + (experienceScore * 0.3) + (educationScore * 0.15) + (atsScore * 0.15));

  // Extract lines for bullet point rewriter
  const rawLines = resumeText.split('\n').map(l => l.trim()).filter(l => l.length > 25 && l.length < 150);
  const sampleLines = rawLines.slice(0, 3);
  const bulletPointRewrites = sampleLines.map(line => {
    return {
      original: line,
      rewritten: `Spearheaded software development initiatives by ${line.toLowerCase().replace(/^[•\-\*]\s*/, '')}, optimizing system efficiency by [X%] and streamlining workflows for [N] active users.`,
      impactHighlight: 'Added strong action verb (Spearheaded), clear structure, and measurable impact placeholders.'
    };
  });

  if (bulletPointRewrites.length === 0) {
    bulletPointRewrites.push({
      original: 'Developed features for web application and worked with team members.',
      rewritten: 'Engineered high-performance web application features using modern frameworks, collaborating across cross-functional teams to improve user engagement by [X%].',
      impactHighlight: 'Transformed passive responsibility description into impactful achievement.'
    });
  }

  const targetTitle = jobTitle || 'Software Engineer';
  const targetComp = companyName || 'Target Company';

  return {
    matchScore: {
      overall: overallScore,
      skillsScore,
      experienceScore,
      educationScore,
      atsScore
    },
    matchedSkills: matchedSkills.slice(0, 10),
    missingSkills: missingSkills.length > 0 ? missingSkills.slice(0, 8) : ['Docker', 'CI/CD Pipelines', 'TypeScript'],
    keywords: {
      matched: matchedKw.slice(0, 10),
      missing: missingKw.length > 0 ? missingKw.slice(0, 8) : ['Unit Testing', 'Cloud Services', 'System Design']
    },
    atsIssues,
    recommendations: [
      `Incorporate missing high-priority keywords (${(missingSkills.slice(0, 3).join(', ') || 'Docker, TypeScript')}) into your skills and project descriptions.`,
      `Tailor your Professional Summary directly for ${targetTitle} roles.`,
      `Quantify impact in bullet points using metric placeholders like percentage improvements or user count.`
    ],
    improvedSummary: `Results-driven ${targetTitle} with hands-on technical expertise in ${matchedSkills.slice(0, 3).join(', ') || 'software development'}. Skilled in writing clean, scalable code and delivering high-quality solutions. Eager to bring strong problem-solving abilities and dedication to ${targetComp}.`,
    bulletPointRewrites,
    coverLetter: `Dear Hiring Manager,\n\nI am writing to express my strong enthusiasm for the ${targetTitle} position at ${targetComp}. Having reviewed the position requirements, I am confident that my technical background in ${matchedSkills.slice(0, 3).join(', ') || 'software development'} aligns well with your team's goals.\n\nThroughout my practical experience and projects, I have focused on building responsive, maintainable applications and solving complex problem domains. I am eager to bring this passion for engineering excellence to ${targetComp}.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my skills can contribute to your projects.\n\nSincerely,\nCandidate`,
    interviewQuestions: [
      {
        question: `How have you used ${matchedSkills[0] || 'your core technologies'} to build scalable features in your recent projects?`,
        category: 'Technical Knowledge',
        sampleAnswerHint: 'Detail the project context, technical architecture choices, problem solved, and key performance outcomes.'
      },
      {
        question: `How would you approach integrating ${missingSkills[0] || 'a new technology'} if required for this role?`,
        category: 'Adaptability & Learning',
        sampleAnswerHint: 'Emphasize your learning methodology, documentation reading habits, building small prototypes, and seeking peer feedback.'
      },
      {
        question: 'Describe a challenging bug or performance bottleneck you encountered and how you resolved it.',
        category: 'Problem Solving',
        sampleAnswerHint: 'Use the STAR method (Situation, Task, Action, Result) focusing on systematic debugging and profiling tools.'
      },
      {
        question: `Why are you interested in joining ${targetComp} as a ${targetTitle}?`,
        category: 'Culture & Motivation',
        sampleAnswerHint: 'Align your career goals with the company product, technology stack, and engineering team values.'
      },
      {
        question: 'How do you ensure code quality, testability, and documentation in a fast-paced development cycle?',
        category: 'Best Practices',
        sampleAnswerHint: 'Discuss code reviews, automated unit testing, clear commit messages, and modular clean code principles.'
      },
      {
        question: 'Explain how RESTful APIs communicate and how you handle error states and data validation.',
        category: 'Backend & APIs',
        sampleAnswerHint: 'Mention HTTP status codes, JSON payload structure, input sanitization, and structured error responses.'
      },
      {
        question: 'How do you manage version control and collaborative git workflows when working with team members?',
        category: 'Collaboration Tools',
        sampleAnswerHint: 'Reference feature branching, pull request reviews, rebase/merge conflict resolution, and CI checks.'
      },
      {
        question: 'What is your strategy for prioritizing tasks when deadlines overlap?',
        category: 'Time Management',
        sampleAnswerHint: 'Talk about impact vs effort prioritization, communicating early with stakeholders, and breaking tasks into sprints.'
      },
      {
        question: 'Can you describe a project where you had to work with ambiguous or changing requirements?',
        category: 'Agility',
        sampleAnswerHint: 'Explain how you sought clarification, created MVP prototypes, and iterated based on feedback.'
      },
      {
        question: 'Where do you see your technical skills evolving over the next 2 years in software development?',
        category: 'Career Growth',
        sampleAnswerHint: 'Express enthusiasm for mastering modern full-stack development, cloud architecture, and taking ownership of systems.'
      }
    ]
  };
}

function capitalizeWord(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  generateResumeAnalysis
};
