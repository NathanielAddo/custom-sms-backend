// routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/session", authController.getSession);

export const authRoutes = router;