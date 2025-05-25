import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "../middlewares/error.middleware";
import memberRoutes from "../routes/member.routes";
import registrationRoutes from "../routes/registration.routes";

export const createServer = () => {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/members", memberRoutes);
  app.use("/api/registrations", registrationRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
};