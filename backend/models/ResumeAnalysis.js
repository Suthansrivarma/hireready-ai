const mongoose = require('mongoose');

const atsIssueSchema = new mongoose.Schema({
  severity: { type: String, enum: ['critical', 'warning', 'info'], default: 'warning' },
  category: { type: String, required: true },
  issue: { type: String, required: true },
  solution: { type: String, required: true }
}, { _id: false });

const bulletRewriteSchema = new mongoose.Schema({
  original: { type: String, required: true },
  rewritten: { type: String, required: true },
  impactHighlight: { type: String, required: true }
}, { _id: false });

const interviewQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, required: true },
  sampleAnswerHint: { type: String, required: true }
}, { _id: false });

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    resumeName: {
      type: String,
      default: 'Uploaded_Resume.pdf'
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    companyName: {
      type: String,
      default: 'Target Company',
      trim: true
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required']
    },
    matchScore: {
      overall: { type: Number, required: true, min: 0, max: 100 },
      skillsScore: { type: Number, default: 0, min: 0, max: 100 },
      experienceScore: { type: Number, default: 0, min: 0, max: 100 },
      educationScore: { type: Number, default: 0, min: 0, max: 100 },
      atsScore: { type: Number, default: 0, min: 0, max: 100 }
    },
    matchedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    keywords: {
      matched: [{ type: String }],
      missing: [{ type: String }]
    },
    atsIssues: [atsIssueSchema],
    recommendations: [{ type: String }],
    improvedSummary: { type: String, default: '' },
    bulletPointRewrites: [bulletRewriteSchema],
    coverLetter: { type: String, default: '' },
    interviewQuestions: [interviewQuestionSchema],
    rawResumeText: { type: String, select: false } // kept for re-analysis, not returned by default
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
