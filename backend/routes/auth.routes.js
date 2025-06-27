const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  resetPassword,
  newPassword,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/new-password", newPassword);

module.exports = router;
