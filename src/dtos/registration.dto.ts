///dtos/registration.dto.ts
export interface CreateRegistrationDto {
  firstName: string;
  surname: string;
  dob: Date;
  subgroup: string;
  email?: string;
  phoneNumber: string;
  description?: string;
  userType: "member" | "non-member";
  registrationType: "birthday" | "thankyou";
}

export interface BulkRegistrationDto {
  registrations: CreateRegistrationDto[];
  subgroup: string;
}

export interface RegistrationResponseDto {
  id: string;
  firstName: string;
  surname: string;
  dob: string;
  subgroup: string;
  email?: string;
  phoneNumber: string;
  description?: string;
  userType: string;
  registrationType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExcelRegistrationRow {
  firstName?: string;
  phoneNumber: string;
  email?: string;
}