import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

// Protected routes
router.use(authMiddleware);

router.route("/logout").get(logout);

export default router;
