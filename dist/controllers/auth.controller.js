"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const axios_1 = __importDefault(require("axios"));
const apiResponse_1 = require("../utils/apiResponse");
class AuthController {
    async login(req, res, next) {
        try {
            const { phone_email, password } = req.body;
            // Forward login request to external service
            const response = await axios_1.default.post('https://db-api-v2.akwaabasoftware.com/clients/login', {
                phone_email,
                password
            });
            // Store user session
            req.session.user = {
                id: response.data.user.id,
                token: response.data.token,
                email: response.data.user.email,
                phone: response.data.user.phone
            };
            new apiResponse_1.ApiResponse(res, 200, "Login successful", {
                token: response.data.token,
                user: response.data.user
            });
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                return next(new apiResponse_1.ApiError(error.response?.status || 500, error.response?.data?.message || 'Login failed'));
            }
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            req.session.destroy(() => {
                new apiResponse_1.ApiResponse(res, 200, "Logout successful");
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getSession(req, res, next) {
        try {
            if (!req.session.user) {
                throw new apiResponse_1.ApiError(401, "Not authenticated");
            }
            new apiResponse_1.ApiResponse(res, 200, "Session valid", req.session.user);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
