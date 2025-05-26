// config/server.ts
import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "../middlewares/error.middleware";
import memberRoutes from "../routes/member.routes";
import registrationRoutes from "../routes/registration.routes";
import { authRoutes } from "../routes/auth.routes"; // Add this import

export const createServer = () => {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Session configuration
  app.use(session({
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
  app.use("/api/auth", authRoutes); // Add this line
  app.use("/api/members", memberRoutes);
  app.use("/api/registrations", registrationRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
};