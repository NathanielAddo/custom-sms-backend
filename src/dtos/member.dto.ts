export interface CreateMemberDto {
  firstName: string;
  surname: string;
  dob: Date;
  subgroup: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
}

export interface UpdateMemberDto extends Partial<CreateMemberDto> {}

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