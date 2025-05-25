import { Response } from "express";

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApiResponse {
  constructor(
    res: Response,
    statusCode: number,
    message: string,
    data: any = null
  ) {
    res.status(statusCode).json({
      success: statusCode < 400,
      message,
      data,
    });
  }
}