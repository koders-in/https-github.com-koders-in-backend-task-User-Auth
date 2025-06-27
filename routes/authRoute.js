const express = require("express");
const router = express.Router();

const {
  register,
  login,
  requestResetPassword,
  setNewPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", requestResetPassword);
router.post("/new-password", setNewPassword);

module.exports = router;
