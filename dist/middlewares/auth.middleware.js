"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const authenticate = (req, res, next) => {
    if (!req.session.user) {
        return next(new apiResponse_1.ApiError(401, "Unauthorized - Please login first"));
    }
    next();
};
exports.authenticate = authenticate;
const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (req.session.user?.role !== requiredRole) {
            return next(new apiResponse_1.ApiError(403, "Forbidden - Insufficient permissions"));
        }
        next();
    };
};
exports.authorize = authorize;
