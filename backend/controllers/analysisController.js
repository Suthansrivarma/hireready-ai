const { parseDocument } = require('../services/documentParser');
const { generateResumeAnalysis } = require('../services/aiService');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const User = require('../models/User');

// @desc    Upload resume & analyze against job description (100% Free & Unlimited)
// @route   POST /api/analysis/analyze
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    const user = req.user;
    const { jobTitle, companyName, jobDescription } = req.body;

    // Validate Inputs
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a detailed job description (minimum 20 characters).'
      });
    }

    let resumeText = '';
    let resumeName = 'Uploaded_Resume.pdf';

    if (req.file) {
      resumeName = req.file.originalname;
      resumeText = await parseDocument(req.file.buffer, req.file.mimetype);
    } else if (req.body.resumeText && req.body.resumeText.trim().length > 30) {
      resumeText = req.body.resumeText.trim();
      resumeName = 'Pasted_Resume_Text.txt';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF/DOCX resume file or paste your resume text.'
      });
    }

    // Run AI Analysis
    const aiResult = await generateResumeAnalysis(
      resumeText,
      jobDescription,
      jobTitle || 'Software Professional',
      companyName || 'Target Employer'
    );

    // Increment Usage Count (for analytics purposes only)
    if (user._id && typeof user.save === 'function') {
      user.usage = user.usage || { analysisCount: 0 };
      user.usage.analysisCount += 1;
      await user.save().catch(() => {});
    } else {
      user.usage = user.usage || {};
      user.usage.analysisCount = (user.usage.analysisCount || 0) + 1;
    }

    // Save Analysis to DB / Memory Cache
    let savedAnalysis;
    try {
      savedAnalysis = await ResumeAnalysis.create({
        userId: user._id || user.id,
        resumeName,
        jobTitle: jobTitle || 'Software Professional',
        companyName: companyName || 'Target Employer',
        jobDescription,
        matchScore: aiResult.matchScore,
        matchedSkills: aiResult.matchedSkills,
        missingSkills: aiResult.missingSkills,
        keywords: aiResult.keywords,
        atsIssues: aiResult.atsIssues,
        recommendations: aiResult.recommendations,
        improvedSummary: aiResult.improvedSummary,
        bulletPointRewrites: aiResult.bulletPointRewrites,
        coverLetter: aiResult.coverLetter,
        interviewQuestions: aiResult.interviewQuestions
      });
    } catch (dbErr) {
      const mockId = 'analysis_' + Date.now();
      savedAnalysis = {
        _id: mockId,
        id: mockId,
        userId: user._id || user.id,
        resumeName,
        jobTitle: jobTitle || 'Software Professional',
        companyName: companyName || 'Target Employer',
        jobDescription,
        ...aiResult,
        createdAt: new Date()
      };
      if (!req.app.locals.inMemoryAnalyses) req.app.locals.inMemoryAnalyses = new Map();
      req.app.locals.inMemoryAnalyses.set(mockId, savedAnalysis);
    }

    return res.status(201).json({
      success: true,
      data: savedAnalysis,
      usage: user.usage
    });
  } catch (error) {
    console.error('[Analyze Controller Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during resume analysis.'
    });
  }
};

// @desc    Get user's recent analyses history
// @route   GET /api/analysis/recent
// @access  Private
const getRecentAnalyses = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let analyses = [];

    try {
      analyses = await ResumeAnalysis.find({ userId })
        .sort({ createdAt: -1 })
        .limit(30)
        .select('-rawResumeText');
    } catch (dbErr) {
      if (req.app.locals.inMemoryAnalyses) {
        analyses = Array.from(req.app.locals.inMemoryAnalyses.values())
          .filter(a => String(a.userId) === String(userId))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return res.json({
      success: true,
      count: analyses.length,
      data: analyses
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single analysis by ID
// @route   GET /api/analysis/:id
// @access  Private
const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let analysis;
    try {
      analysis = await ResumeAnalysis.findOne({ _id: id, userId });
    } catch (dbErr) {
      if (req.app.locals.inMemoryAnalyses) {
        analysis = req.app.locals.inMemoryAnalyses.get(id);
      }
    }

    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found' });
    }

    return res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete analysis
// @route   DELETE /api/analysis/:id
// @access  Private
const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    try {
      await ResumeAnalysis.deleteOne({ _id: id, userId });
    } catch (dbErr) {
      if (req.app.locals.inMemoryAnalyses) {
        req.app.locals.inMemoryAnalyses.delete(id);
      }
    }

    return res.json({ success: true, message: 'Analysis deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  analyzeResume,
  getRecentAnalyses,
  getAnalysisById,
  deleteAnalysis
};
