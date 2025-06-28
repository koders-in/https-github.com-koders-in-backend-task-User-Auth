const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      expiresIn: 3600, // 1 hour in seconds 
      user: {
        fullName: user.fullName,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};


// reset password token
exports.resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } 
    );

    res.json({ message: 'Reset token generated', resetToken });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Set new password
exports.setNewPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password has been updated' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

// Logout
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};