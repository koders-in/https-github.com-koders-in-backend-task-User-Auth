const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getUserProfile } = require("../controllers/user.controller");

// @route   GET /user/profile
// @desc    Get authenticated user's profile
// @access  Private (requires JWT)
router.get("/profile", authMiddleware, getUserProfile);
module.exports = router;
