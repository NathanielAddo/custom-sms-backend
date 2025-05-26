"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const data_source_1 = require("../config/data-source");
const registration_entity_1 = require("../entities/registration.entity");
const apiResponse_1 = require("../utils/apiResponse");
class RegistrationService {
    constructor() {
        this.registrationRepository = data_source_1.AppDataSource.getRepository(registration_entity_1.Registration);
    }
    toResponseDto(registration) {
        return {
            id: registration.id,
            firstName: registration.firstName,
            surname: registration.surname,
            dob: registration.dob.toISOString().split('T')[0],
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
    async createRegistration(data) {
        const registration = this.registrationRepository.create(data);
        await this.registrationRepository.save(registration);
        return this.toResponseDto(registration);
    }
    async bulkCreateRegistrations(data) {
        const registrations = data.registrations.map(reg => ({
            ...reg,
            subgroup: data.subgroup,
        }));
        const created = await this.registrationRepository.save(registrations);
        return created.map(this.toResponseDto);
    }
    async getAllRegistrations() {
        const registrations = await this.registrationRepository.find({
            order: { createdAt: "DESC" },
            take: 50, // Limit to recent 50 registrations
        });
        return registrations.map(this.toResponseDto);
    }
    async deleteRegistration(id) {
        const result = await this.registrationRepository.delete(id);
        if (result.affected === 0) {
            throw new apiResponse_1.ApiError(404, "Registration not found");
        }
    }
}
exports.RegistrationService = RegistrationService;
