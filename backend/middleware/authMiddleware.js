const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'hireready_super_secret_jwt_key_2026_dev_mode'
      );

      // Check user
      if (req.app.locals.inMemoryUsers && req.app.locals.inMemoryUsers.has(decoded.id)) {
        req.user = req.app.locals.inMemoryUsers.get(decoded.id);
      } else {
        req.user = await User.findById(decoded.id).select('-passwordHash');
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found or token invalid' });
      }

      return next();
    } catch (error) {
      console.error('[Auth Middleware] JWT verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
