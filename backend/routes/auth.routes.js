import { Router } from "express";
import { register, login, logout,newPassword,profile } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

// Protected routes
router.use(authMiddleware);

router.route("/logout").get(logout);
router.route("/new-password").post(newPassword);
router.route("/profile").get(profile);

export default router;
