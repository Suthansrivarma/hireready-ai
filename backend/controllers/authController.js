const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'hireready_super_secret_jwt_key_2026_dev_mode',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if user exists in DB or memory
    let existingUser = await User.findOne({ email: email.toLowerCase() }).catch(() => null);

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let user;
    try {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        plan: 'FREE_UNLIMITED',
        usage: { analysisCount: 0, lastResetDate: new Date() }
      });
    } catch (dbErr) {
      const fakeId = 'mem_' + Date.now();
      user = {
        _id: fakeId,
        id: fakeId,
        name,
        email: email.toLowerCase(),
        passwordHash,
        plan: 'FREE_UNLIMITED',
        usage: { analysisCount: 0, lastResetDate: new Date() },
        createdAt: new Date()
      };
      if (!req.app.locals.inMemoryUsers) req.app.locals.inMemoryUsers = new Map();
      req.app.locals.inMemoryUsers.set(fakeId, user);
      req.app.locals.inMemoryUsers.set(email.toLowerCase(), user);
    }

    const token = generateToken(user._id || user.id);

    return res.status(201).json({
      success: true,
      data: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        plan: 'FREE_UNLIMITED',
        usage: user.usage,
        token
      }
    });
  } catch (error) {
    console.error('[Register Error]', error);
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    let user = await User.findOne({ email: email.toLowerCase() }).catch(() => null);

    if (!user && req.app.locals.inMemoryUsers) {
      user = req.app.locals.inMemoryUsers.get(email.toLowerCase());
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Force plan to FREE_UNLIMITED for all users
    user.plan = 'FREE_UNLIMITED';

    const token = generateToken(user._id || user.id);

    return res.json({
      success: true,
      data: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        plan: 'FREE_UNLIMITED',
        usage: user.usage,
        token
      }
    });
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = req.user;
    user.plan = 'FREE_UNLIMITED';
    return res.json({
      success: true,
      data: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        plan: 'FREE_UNLIMITED',
        usage: user.usage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
