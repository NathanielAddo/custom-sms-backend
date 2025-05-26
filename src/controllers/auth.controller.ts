// controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ApiResponse, ApiError } from "../utils/apiResponse";

import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      token: string;
      email: string;
      phone: string;
      [key: string]: any;
    };
  }
}

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone_email, password } = req.body;
      
      // Forward login request to external service
      const response = await axios.post('https://db-api-v2.akwaabasoftware.com/clients/login', {
        phone_email,
        password
      });

      // Store user session
      req.session.user = {
  id: response.data.user.id.toString(), 
        token: response.data.token,
        email: response.data.user.email,
        phone: response.data.user.phone
      };

      new ApiResponse(res, 200, "Login successful", {
        token: response.data.token,
        user: response.data.user
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return next(new ApiError(error.response?.status || 500, error.response?.data?.message || 'Login failed'));
      }
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(() => {
        new ApiResponse(res, 200, "Logout successful");
      });
    } catch (error) {
      next(error);
    }
  }

  public async getSession(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.session.user) {
        throw new ApiError(401, "Not authenticated");
      }
      new ApiResponse(res, 200, "Session valid", req.session.user);
    } catch (error) {
      next(error);
    }
  }
}