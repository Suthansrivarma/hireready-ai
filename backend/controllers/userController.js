const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name } = req.body;

    if (name) user.name = name;
    user.plan = 'FREE_UNLIMITED';

    if (user._id && typeof user.save === 'function') {
      await user.save().catch(() => {});
    }

    return res.json({
      success: true,
      data: {
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        plan: 'FREE_UNLIMITED',
        usage: user.usage
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user usage & tier details (All users have 100% Free Unlimited Access)
// @route   GET /api/user/usage
// @access  Private
const getUserUsage = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      data: {
        plan: 'FREE_UNLIMITED',
        analysisCount: (user.usage && user.usage.analysisCount) || 0,
        isUnlimited: true
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  updateProfile,
  getUserUsage
};
