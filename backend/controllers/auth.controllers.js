import User from "../models/user.model.js";
import { sendToken } from "./../utils/sendToken.js"

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

   return  sendToken(user, res);

    
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

 **
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */  

export const login = async (req, res) =>{


}