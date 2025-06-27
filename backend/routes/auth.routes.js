import { Router } from "express";
import {
  register,
  login,
  logout,
  newPassword,
  profile,
  resetPassword,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);
router.route("/new-password").post(newPassword);

// Protected routes
router.use(authMiddleware);

router.route("/logout").get(logout);
router.route("/profile").get(profile);

export default router;
