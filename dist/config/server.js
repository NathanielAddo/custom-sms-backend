"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
// config/server.ts
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("../middlewares/error.middleware");
const member_routes_1 = __importDefault(require("../routes/member.routes"));
const registration_routes_1 = __importDefault(require("../routes/registration.routes"));
const auth_routes_1 = require("../routes/auth.routes"); // Add this import
const createServer = () => {
    const app = (0, express_1.default)();
    // Middlewares
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Session configuration
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));
    // Routes
    app.use("/api/auth", auth_routes_1.authRoutes); // Add this line
    app.use("/api/members", member_routes_1.default);
    app.use("/api/registrations", registration_routes_1.default);
    // Error handling
    app.use(error_middleware_1.errorHandler);
    return app;
};
exports.createServer = createServer;
