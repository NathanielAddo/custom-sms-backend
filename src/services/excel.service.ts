//services/excel.service.ts
import * as XLSX from "xlsx";
import { ExcelRegistrationRow } from "../dtos/registration.dto";
import { ApiError } from "../utils/apiResponse";

export class ExcelService {
  static async parseRegistrationFile(fileBuffer: Buffer): Promise<ExcelRegistrationRow[]> {
    try {
      const workbook = XLSX.read(fileBuffer);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON with header mapping
      const data = XLSX.utils.sheet_to_json<ExcelRegistrationRow>(worksheet);
      
      // Validate required fields
      return data.map(row => {
        if (!row.phoneNumber) {
          throw new ApiError(400, "Phone number is required in all rows");
        }
        return {
          firstName: row.firstName?.trim(),
          phoneNumber: row.phoneNumber.trim(),
          email: row.email?.trim(),
        };
      });
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, "Invalid Excel file format");
    }
  }

  static generateTemplate(subgroup?: string): Buffer {
    const ws = XLSX.utils.aoa_to_sheet([
      ["First name (optional)", "Phone number", "Email (optional)", "Subgroup"],
      ["", "", "", subgroup || ""]
    ]);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    
    return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  }
}