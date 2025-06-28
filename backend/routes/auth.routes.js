const express = require('express');
const {
  register,
  login,
  resetPasswordRequest,
  setNewPassword,
  logout
} = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  register
);

// Login Route
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  login
);
 

//Reset Password Route
router.post(
  '/reset-password',
  [
    check('email', 'Valid email is required').isEmail(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  resetPasswordRequest
);

// Set New Password Route
router.post(
  '/new-password',
  [
    check('token', 'Reset token is required').notEmpty(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  setNewPassword
);

// Logout Route
router.post('/logout', logout);

module.exports = router;
