"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
//services/member.service.ts
const data_source_1 = require("../config/data-source");
const member_entity_1 = require("../entities/member.entity");
const apiResponse_1 = require("../utils/apiResponse");
class MemberService {
    constructor() {
        this.memberRepository = data_source_1.AppDataSource.getRepository(member_entity_1.Member);
    }
    toResponseDto(member) {
        return {
            id: member.id,
            firstName: member.firstName,
            surname: member.surname,
            dob: member.dob.toISOString().split('T')[0],
            subgroup: member.subgroup,
            email: member.email,
            phoneNumber: member.phoneNumber,
            imageUrl: member.imageUrl,
            createdAt: member.createdAt.toISOString(),
            updatedAt: member.updatedAt.toISOString(),
        };
    }
    async createMember(data) {
        const member = this.memberRepository.create(data);
        await this.memberRepository.save(member);
        return this.toResponseDto(member);
    }
    async getMembersForUser(userId, filter = {}) {
        let query = this.memberRepository.createQueryBuilder("member")
            .where("member.userId = :userId", { userId });
        if (filter.searchTerm) {
            query = query.andWhere("LOWER(member.firstName) LIKE :searchTerm OR LOWER(member.surname) LIKE :searchTerm OR LOWER(member.email) LIKE :searchTerm", { searchTerm: `%${filter.searchTerm.toLowerCase()}%` });
        }
        if (filter.subgroup && filter.subgroup !== "All") {
            query = query.andWhere("member.subgroup = :subgroup", { subgroup: filter.subgroup });
        }
        const members = await query.getMany();
        return members.map(this.toResponseDto);
    }
    async getAllMembers(filter = {}) {
        let query = this.memberRepository.createQueryBuilder("member");
        if (filter.searchTerm) {
            query = query.where("LOWER(member.firstName) LIKE :searchTerm OR LOWER(member.surname) LIKE :searchTerm OR LOWER(member.email) LIKE :searchTerm", { searchTerm: `%${filter.searchTerm.toLowerCase()}%` });
        }
        if (filter.subgroup && filter.subgroup !== "All") {
            query = query.andWhere("member.subgroup = :subgroup", { subgroup: filter.subgroup });
        }
        const members = await query.getMany();
        return members.map(this.toResponseDto);
    }
    async getMemberById(id) {
        const member = await this.memberRepository.findOneBy({ id });
        if (!member) {
            throw new apiResponse_1.ApiError(404, "Member not found");
        }
        return this.toResponseDto(member);
    }
    async updateMember(id, data) {
        const member = await this.memberRepository.findOneBy({ id });
        if (!member) {
            throw new apiResponse_1.ApiError(404, "Member not found");
        }
        this.memberRepository.merge(member, data);
        await this.memberRepository.save(member);
        return this.toResponseDto(member);
    }
    async deleteMember(id) {
        const result = await this.memberRepository.delete(id);
        if (result.affected === 0) {
            throw new apiResponse_1.ApiError(404, "Member not found");
        }
    }
    async getSubgroups() {
        const result = await this.memberRepository
            .createQueryBuilder("member")
            .select("DISTINCT(member.subgroup)", "subgroup")
            .getRawMany();
        return result.map(item => item.subgroup);
    }
}
exports.MemberService = MemberService;
