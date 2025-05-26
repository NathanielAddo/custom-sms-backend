//dtos/member.dto.ts
export interface CreateMemberDto {
  firstName: string;
  surname: string;
  dob: Date;
  subgroup: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  userId: number; // new
}


export interface UpdateMemberDto extends Partial<Omit<CreateMemberDto, 'userId'>> {} 

export interface FilterMembersDto {
  searchTerm?: string;
  subgroup?: string;
}

export interface MemberResponseDto {
  id: string;
  firstName: string;
  surname: string;
  dob: string;
  subgroup: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}