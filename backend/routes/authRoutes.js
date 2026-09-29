const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { strictLimiter } = require('../middleware/rateLimiter');

router.post('/register', strictLimiter, registerUser);
router.post('/login', strictLimiter, loginUser);
router.get('/me', protect, getMe);

module.exports = router;
