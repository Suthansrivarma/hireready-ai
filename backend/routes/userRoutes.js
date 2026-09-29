const express = require('express');
const router = express.Router();
const { updateProfile, getUserUsage } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);
router.get('/usage', protect, getUserUsage);

module.exports = router;
