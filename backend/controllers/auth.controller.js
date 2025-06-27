const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const resetTokens = new Map();

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullname, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const authKey = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    resetTokens.set(authKey, {
      userId: user._id,
      expiresAt,
    });

    res.json({
      success: true,
      message: "Authentication key generated",
      authKey,
      expiresAt,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during password reset",
      error: err.message,
    });
  }
};

// New Password
exports.newPassword = async (req, res) => {
  try {
    // Get authKey from headers
    const authKey = req.headers.authorization?.split(" ")[1];
    const { password } = req.body;

    if (!authKey) {
      return res.status(401).json({
        success: false,
        message: "Authentication key is missing",
      });
    }

    const tokenData = resetTokens.get(authKey);
    if (!tokenData || tokenData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired authentication key",
      });
    }

    const user = await User.findById(tokenData.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    resetTokens.delete(authKey);

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during password update",
      error: err.message,
    });
  }
};
