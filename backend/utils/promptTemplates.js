/**
 * System prompt and user prompt templates for Gemini AI analysis
 */

const SYSTEM_PROMPT = `
You are HireReady AI, an expert ATS (Applicant Tracking System) reviewer and executive resume strategist specializing in software/IT, tech, and engineering early-career roles.

CRITICAL NON-NEGOTIABLE SAFETY & ACCURACY RULES:
1. STRICT ANTI-FABRICATION RULE: You MUST NOT invent or fabricate work experience, projects, education, certifications, technologies, achievements, or job titles that do NOT exist in the candidate's resume text.
2. GAP IDENTIFICATION: If a required skill, tool, or qualification is present in the Job Description but absent from the candidate's resume, explicitly list it under missingSkills / missingKeywords or ATS Gaps. Do NOT pretend the candidate has it.
3. REWRITING METRICS RULE: When rewriting bullet points, use strong action verbs (e.g., Developed, Engineered, Optimized, Architected, Spearheaded) and highlight impact. If exact numerical metrics are not in the candidate's original text, use clean placeholder brackets like "[X%]", "[N users]", or "[M milliseconds]" rather than fabricating fake numbers.
4. NO FALSE CLAIMS: Do not include claims like "100% ATS Guaranteed".
5. OUTPUT FORMAT: Respond ONLY with valid, raw JSON with NO markdown code block wrappers (\`\`\`json ... \`\`\`), no introductory text, and no closing notes.
`;

function buildAnalysisPrompt(resumeText, jobDescription, jobTitle = '', companyName = '') {
  return `
Analyze the candidate's resume against the target job description below and output a detailed JSON analysis matching the exact structure specified.

JOB TITLE: ${jobTitle || 'Software / IT Role'}
TARGET COMPANY: ${companyName || 'Target Employer'}

--- CANDIDATE RESUME TEXT ---
${resumeText}

--- TARGET JOB DESCRIPTION ---
${jobDescription}

--- REQUIRED JSON STRUCTURE ---
{
  "matchScore": {
    "overall": 78,
    "skillsScore": 82,
    "experienceScore": 70,
    "educationScore": 90,
    "atsScore": 75
  },
  "matchedSkills": ["JavaScript", "React", "Node.js", "REST APIs", "Git"],
  "missingSkills": ["Docker", "Kubernetes", "AWS", "TypeScript"],
  "keywords": {
    "matched": ["React", "State Management", "Component Design", "Agile"],
    "missing": ["CI/CD Pipelines", "Unit Testing", "GraphQL", "Microservices"]
  },
  "atsIssues": [
    {
      "severity": "critical",
      "category": "Section Headings",
      "issue": "Unconventional section title used (e.g. 'Stuff I Did' instead of 'Work Experience').",
      "solution": "Use standard ATS headings: 'Work Experience', 'Education', 'Technical Skills', 'Projects'."
    },
    {
      "severity": "warning",
      "category": "File Formatting",
      "issue": "Complex multi-column or table layout detected.",
      "solution": "Use a single-column, left-aligned layout with clean standard bullet points."
    }
  ],
  "recommendations": [
    "Incorporate key missing tech stack terms like TypeScript and Docker if you have basic exposure.",
    "Quantify impact in bullet points (e.g., page load speeds, API latency reductions).",
    "Tailor your Professional Summary directly towards the target job title."
  ],
  "improvedSummary": "Detail-oriented Software Engineer with hands-on experience building scalable web applications with React, Node.js, and REST APIs. Proven track record of developing responsive UIs and optimizing backend services. Eager to leverage technical skills and problem-solving abilities to deliver high-performance software solutions.",
  "bulletPointRewrites": [
    {
      "original": "Worked on frontend code for website and fixed bugs.",
      "rewritten": "Engineered responsive frontend UI components using React and optimized client-side state, reducing load times by [X%] and resolving [N] high-priority bugs.",
      "impactHighlight": "Transformed weak task description into action-oriented achievement with impact placeholder."
    }
  ],
  "coverLetter": "Dear Hiring Team,\\n\\nI am writing to express my strong interest in the [Job Title] role at [Company Name]. With a solid foundation in software development, hands-on project experience in full-stack technologies, and a commitment to writing clean, maintainable code, I am excited about the opportunity to contribute to your engineering team...\\n\\nSincerely,\\nCandidate",
  "interviewQuestions": [
    {
      "question": "Can you explain how you optimized state management or component rendering in your React projects?",
      "category": "Technical - Frontend",
      "sampleAnswerHint": "Focus on specific techniques used in your experience such as memoization, lifting state up, or avoiding unnecessary re-renders."
    }
  ]
}
`;
}

module.exports = {
  SYSTEM_PROMPT,
  buildAnalysisPrompt
};
