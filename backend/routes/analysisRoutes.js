const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  getRecentAnalyses,
  getAnalysisById,
  deleteAnalysis
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { strictLimiter } = require('../middleware/rateLimiter');

router.post('/analyze', protect, strictLimiter, upload.single('resume'), analyzeResume);
router.get('/recent', protect, getRecentAnalyses);
router.get('/:id', protect, getAnalysisById);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router;
