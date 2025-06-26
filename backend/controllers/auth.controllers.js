import User from "../models/user.model.js";
import { sendToken } from "./../utils/sendToken.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    console.log(req.body);

    // check if all the required fields are present

    if (
      [fullName, email, password].some((field) => !field || field.trim() === "")
    ) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    return sendToken(user, res);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if all the required fields are present
    if ([email, password].some((field) => !field || field.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: " that email or password is wrong!.",
      });
    }
    // Check if the password matches
    if (password === user.password) {
      return sendToken(user, res);
    } else {
      return res.status(401).json({
        message: " that email or password is wrong!.",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

/**
 * @desc    Logout a user
 * @route   GET /api/auth/logout
 * @access  Private
 */


export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({
      message: "Error during logout.",
      error: error.message,
    });
  }
};

/**
 * @desc    Update password
 * @route   POST /api/auth/new-password
 * @access  Private
 */

export const newPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new passwords are required" });
    }

    const user = await User.findById(req.user._id);

    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  } 
}
/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */

export const profile=async(req,res)=>{
 try {
  const user = await User.findById(req.user._id).select("-password");
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  return res.status(200).json(user);
 } catch (error) {
  
 } 
}