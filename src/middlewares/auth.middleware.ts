// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiResponse";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return next(new ApiError(401, "Unauthorized - Please login first"));
  }
  next();
};

export const authorize = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user?.role !== requiredRole) {
      return next(new ApiError(403, "Forbidden - Insufficient permissions"));
    }
    next();
  };
};