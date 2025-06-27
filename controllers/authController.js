const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = await User.create({ fullName, email, password });
  const token = generateToken(newUser._id);
  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  res.json({ token });
};

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = Math.random().toString(36).slice(2, 10);
  user.resetToken = resetToken;
  await user.save();

  res.json({ message: "Reset token generated", resetToken });
};

const setNewPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  const user = await User.findOne({ email, resetToken });
  if (!user) return res.status(400).json({ message: "Invalid reset Token" });

  user.password = newPassword;
  user.resetToken = undefined;
  await user.save();

  res.json({ message: "Password updated successfully" });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password -resetToken");
  if (!user) return res.status(401).json({ message: "User not found" });

  res.json(user);
};

module.exports = {
  register,
  login,
  requestResetPassword,
  setNewPassword,
  getProfile,
};
