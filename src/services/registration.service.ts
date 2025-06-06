//services/registration.service.ts
import { AppDataSource } from "../config/data-source";
import { Registration } from "../entities/registration.entity";
import { CreateRegistrationDto, BulkRegistrationDto, RegistrationResponseDto } from "../dtos/registration.dto";
import { Repository } from "typeorm";
import { ApiError } from "../utils/apiResponse";

export class RegistrationService {
  private registrationRepository: Repository<Registration>;

  constructor() {
    this.registrationRepository = AppDataSource.getRepository(Registration);
  }

private toResponseDto(registration: Registration): RegistrationResponseDto {
  return {
    id: registration.id,
    firstName: registration.firstName,
    surname: registration.surname,
    dob: new Date(registration.dob).toISOString().split('T')[0],
    subgroup: registration.subgroup,
    email: registration.email,
    phoneNumber: registration.phoneNumber,
    description: registration.description,
    userType: registration.userType,
    registrationType: registration.registrationType,
    createdAt: registration.createdAt.toISOString(),
    updatedAt: registration.updatedAt.toISOString(),
  };
}


async createRegistration(data: CreateRegistrationDto): Promise<RegistrationResponseDto> {
  try {
    if (!data.firstName || !data.surname || !data.dob || !data.phoneNumber || !data.subgroup) {
      throw new ApiError(400, "Missing required registration fields.");
    }
    const normalizedDOB = new Date(data.dob.toString().split('T')[0]);
    const registration = this.registrationRepository.create({
      ...data,
      dob: normalizedDOB,
    });
    await this.registrationRepository.save(registration);
    return this.toResponseDto(registration);
  } catch (error: any) {
    console.error("Error creating registration:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to create registration.");
  }
}


  async bulkCreateRegistrations(data: BulkRegistrationDto): Promise<RegistrationResponseDto[]> {
    const registrations = data.registrations.map(reg => ({
      ...reg,
      subgroup: data.subgroup,
    }));

    const created = await this.registrationRepository.save(registrations);
    return created.map(this.toResponseDto);
  }

  async getAllRegistrations(): Promise<RegistrationResponseDto[]> {
    const registrations = await this.registrationRepository.find({
      order: { createdAt: "DESC" },
      take: 50, // Limit to recent 50 registrations
    });
    return registrations.map(this.toResponseDto);
  }

  async deleteRegistration(id: string): Promise<void> {
    const result = await this.registrationRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, "Registration not found");
    }
  }
}