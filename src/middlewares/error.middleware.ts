//middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiResponse";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: null,
  });
};