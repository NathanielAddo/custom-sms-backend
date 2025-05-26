//services/member.service.ts
import { AppDataSource } from "../config/data-source";
import { Member } from "../entities/member.entity";
import { CreateMemberDto, UpdateMemberDto, FilterMembersDto } from "../dtos/member.dto";
import { Repository } from "typeorm";
import { MemberResponseDto } from "../dtos/member.dto";
import { ApiError } from "../utils/apiResponse";

export class MemberService {
  private memberRepository: Repository<Member>;

  constructor() {
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  private toResponseDto(member: Member): MemberResponseDto {
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

async createMember(data: CreateMemberDto): Promise<MemberResponseDto> {
  const member = this.memberRepository.create(data);
  await this.memberRepository.save(member);
  return this.toResponseDto(member);
}

async getMembersForUser(userId: string, filter: FilterMembersDto = {}): Promise<MemberResponseDto[]> {
  let query = this.memberRepository.createQueryBuilder("member")
    .where("member.userId = :userId", { userId });

  if (filter.searchTerm) {
    query = query.andWhere(
      "(LOWER(member.firstName) LIKE :searchTerm OR LOWER(member.surname) LIKE :searchTerm OR LOWER(member.email) LIKE :searchTerm)",
      { searchTerm: `%${filter.searchTerm.toLowerCase()}%` }
    );
  }

  if (filter.subgroup && filter.subgroup !== "All") {
    query = query.andWhere("member.subgroup = :subgroup", { subgroup: filter.subgroup });
  }

  const members = await query.getMany();
  return members.map(this.toResponseDto);
}

  async getAllMembers(filter: FilterMembersDto = {}): Promise<MemberResponseDto[]> {
    let query = this.memberRepository.createQueryBuilder("member");

    if (filter.searchTerm) {
      query = query.where(
        "LOWER(member.firstName) LIKE :searchTerm OR LOWER(member.surname) LIKE :searchTerm OR LOWER(member.email) LIKE :searchTerm",
        { searchTerm: `%${filter.searchTerm.toLowerCase()}%` }
      );
    }

    if (filter.subgroup && filter.subgroup !== "All") {
      query = query.andWhere("member.subgroup = :subgroup", { subgroup: filter.subgroup });
    }

    const members = await query.getMany();
    return members.map(this.toResponseDto);
  }

  async getMemberById(id: string): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new ApiError(404, "Member not found");
    }
    return this.toResponseDto(member);
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<MemberResponseDto> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new ApiError(404, "Member not found");
    }

    this.memberRepository.merge(member, data);
    await this.memberRepository.save(member);
    return this.toResponseDto(member);
  }

  async deleteMember(id: string): Promise<void> {
    const result = await this.memberRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, "Member not found");
    }
  }

  async getSubgroups(): Promise<string[]> {
    const result = await this.memberRepository
      .createQueryBuilder("member")
      .select("DISTINCT(member.subgroup)", "subgroup")
      .getRawMany();

    return result.map(item => item.subgroup);
  }
}