//controllers/member.controller.ts
import { Request, Response, NextFunction } from "express";
import { MemberService } from "../services/member.service";
import { CreateMemberDto, UpdateMemberDto, FilterMembersDto } from "../dtos/member.dto";
import { ApiResponse, ApiError } from "../utils/apiResponse";

export class MemberController {
  private memberService = new MemberService();

// In member.controller.ts
public getAllMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.session.user) {
      return next(new ApiError(401, "Unauthorized: User session is missing"));
    }

    const userId = req.session.user.id;
    if (!userId) {
      return next(new ApiError(400, "User ID is required"));
    }

    const filters: FilterMembersDto = {
      searchTerm: req.query.searchTerm as string,
      subgroup: req.query.subgroup as string,
    };
    const members = await this.memberService.getMembersForUser(userId, filters);
    new ApiResponse(res, 200, "Members retrieved successfully", members);
  } catch (error) {
    next(error);
  }
};


public createMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.session.user) {
      return next(new ApiError(401, "Unauthorized: User session is missing"));
    }

    const userId = req.session.user.id;
    const memberData: CreateMemberDto = { ...req.body, userId };
    const member = await this.memberService.createMember(memberData);
    new ApiResponse(res, 201, "Member created successfully", member);
  } catch (error) {
    next(error);
  }
};


  public getMemberById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId = req.params.id;
      const member = await this.memberService.getMemberById(memberId);
      new ApiResponse(res, 200, "Member retrieved successfully", member);
    } catch (error) {
      next(error);
    }
  };

  public updateMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId = req.params.id;
      const memberData: UpdateMemberDto = req.body;
      const member = await this.memberService.updateMember(memberId, memberData);
      new ApiResponse(res, 200, "Member updated successfully", member);
    } catch (error) {
      next(error);
    }
  };

  public deleteMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const memberId = req.params.id;
      await this.memberService.deleteMember(memberId);
      new ApiResponse(res, 204, "Member deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  public getSubgroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const subgroups = await this.memberService.getSubgroups();
      new ApiResponse(res, 200, "Subgroups retrieved successfully", ["All", ...subgroups]);
    } catch (error) {
      next(error);
    }
  };
}