import { Request, Response, NextFunction } from "express";
import { RegistrationService } from "../services/registration.service";
import { ExcelService } from "../services/excel.service";
import { ApiResponse, ApiError } from "../utils/apiResponse"; // Added ApiError import
import { CreateRegistrationDto } from "../dtos/registration.dto"; // Added import for type safety

export class RegistrationController {
  private registrationService = new RegistrationService();

  public createRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registrationData: CreateRegistrationDto = req.body; // Added type annotation
      const registration = await this.registrationService.createRegistration(registrationData);
      new ApiResponse(res, 201, "Registration created successfully", registration);
    } catch (error) {
      next(error);
    }
  };

  public bulkCreateRegistrations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        throw new ApiError(400, "Excel file is required");
      }

      const rows = await ExcelService.parseRegistrationFile(req.file.buffer);
      const subgroup = req.body.subgroup;

      if (!subgroup) {
        throw new ApiError(400, "Subgroup is required for bulk registration");
      }

      const registrations: CreateRegistrationDto[] = rows.map(row => ({
        firstName: row.firstName || "",
        surname: "", // Not in Excel template, can be updated later
        dob: new Date("2000-01-01"), // Default date, can be updated later
        phoneNumber: row.phoneNumber,
        email: row.email,
        subgroup,
        userType: "member" as const, // Added type assertion
        registrationType: "birthday" as const, // Added type assertion
        description: "Bulk registration",
      }));

      const result = await this.registrationService.bulkCreateRegistrations({
        registrations,
        subgroup,
      });

      new ApiResponse(res, 201, "Bulk registrations created successfully", result);
    } catch (error) {
      next(error);
    }
  };

  public getAllRegistrations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registrations = await this.registrationService.getAllRegistrations();
      new ApiResponse(res, 200, "Registrations retrieved successfully", registrations);
    } catch (error) {
      next(error);
    }
  };

  public deleteRegistration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const registrationId = req.params.id;
      await this.registrationService.deleteRegistration(registrationId);
      new ApiResponse(res, 204, "Registration deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  public downloadTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const subgroup = req.query.subgroup as string | undefined;
      const buffer = ExcelService.generateTemplate(subgroup);
      
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=birthday_registration_template.xlsx");
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };
}