"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const registration_service_1 = require("../services/registration.service");
const excel_service_1 = require("../services/excel.service");
const apiResponse_1 = require("../utils/apiResponse"); // Added ApiError import
class RegistrationController {
    constructor() {
        this.registrationService = new registration_service_1.RegistrationService();
        this.createRegistration = async (req, res, next) => {
            try {
                const registrationData = req.body; // Added type annotation
                const registration = await this.registrationService.createRegistration(registrationData);
                new apiResponse_1.ApiResponse(res, 201, "Registration created successfully", registration);
            }
            catch (error) {
                next(error);
            }
        };
        this.bulkCreateRegistrations = async (req, res, next) => {
            try {
                if (!req.file) {
                    throw new apiResponse_1.ApiError(400, "Excel file is required");
                }
                const rows = await excel_service_1.ExcelService.parseRegistrationFile(req.file.buffer);
                const subgroup = req.body.subgroup;
                if (!subgroup) {
                    throw new apiResponse_1.ApiError(400, "Subgroup is required for bulk registration");
                }
                const registrations = rows.map(row => ({
                    firstName: row.firstName || "",
                    surname: "", // Not in Excel template, can be updated later
                    dob: new Date("2000-01-01"), // Default date, can be updated later
                    phoneNumber: row.phoneNumber,
                    email: row.email,
                    subgroup,
                    userType: "member", // Added type assertion
                    registrationType: "birthday", // Added type assertion
                    description: "Bulk registration",
                }));
                const result = await this.registrationService.bulkCreateRegistrations({
                    registrations,
                    subgroup,
                });
                new apiResponse_1.ApiResponse(res, 201, "Bulk registrations created successfully", result);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllRegistrations = async (req, res, next) => {
            try {
                const registrations = await this.registrationService.getAllRegistrations();
                new apiResponse_1.ApiResponse(res, 200, "Registrations retrieved successfully", registrations);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteRegistration = async (req, res, next) => {
            try {
                const registrationId = req.params.id;
                await this.registrationService.deleteRegistration(registrationId);
                new apiResponse_1.ApiResponse(res, 204, "Registration deleted successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.downloadTemplate = async (req, res, next) => {
            try {
                const subgroup = req.query.subgroup;
                const buffer = excel_service_1.ExcelService.generateTemplate(subgroup);
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment; filename=birthday_registration_template.xlsx");
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.RegistrationController = RegistrationController;
