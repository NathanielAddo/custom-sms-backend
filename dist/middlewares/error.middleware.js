"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const errorHandler = (err, req, res, next) => {
    if (err instanceof apiResponse_1.ApiError) {
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
exports.errorHandler = errorHandler;
