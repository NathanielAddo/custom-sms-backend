"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class ApiResponse {
    constructor(res, statusCode, message, data = null) {
        res.status(statusCode).json({
            success: statusCode < 400,
            message,
            data,
        });
    }
}
exports.ApiResponse = ApiResponse;
