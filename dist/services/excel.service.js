"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const XLSX = __importStar(require("xlsx"));
const apiResponse_1 = require("../utils/apiResponse");
class ExcelService {
    static async parseRegistrationFile(fileBuffer) {
        try {
            const workbook = XLSX.read(fileBuffer);
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            // Convert to JSON with header mapping
            const data = XLSX.utils.sheet_to_json(worksheet);
            // Validate required fields
            return data.map(row => {
                if (!row.phoneNumber) {
                    throw new apiResponse_1.ApiError(400, "Phone number is required in all rows");
                }
                return {
                    firstName: row.firstName?.trim(),
                    phoneNumber: row.phoneNumber.trim(),
                    email: row.email?.trim(),
                };
            });
        }
        catch (error) {
            if (error instanceof apiResponse_1.ApiError)
                throw error;
            throw new apiResponse_1.ApiError(400, "Invalid Excel file format");
        }
    }
    static generateTemplate(subgroup) {
        const ws = XLSX.utils.aoa_to_sheet([
            ["First name (optional)", "Phone number", "Email (optional)", "Subgroup"],
            ["", "", "", subgroup || ""]
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    }
}
exports.ExcelService = ExcelService;
