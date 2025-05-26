"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
// routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/session", authController.getSession);
exports.authRoutes = router;
