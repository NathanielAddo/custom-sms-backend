"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const member_service_1 = require("../services/member.service");
const apiResponse_1 = require("../utils/apiResponse");
class MemberController {
    constructor() {
        this.memberService = new member_service_1.MemberService();
        this.createMember = async (req, res, next) => {
            try {
                const memberData = req.body;
                const member = await this.memberService.createMember(memberData);
                new apiResponse_1.ApiResponse(res, 201, "Member created successfully", member);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllMembers = async (req, res, next) => {
            try {
                const filters = {
                    searchTerm: req.query.searchTerm,
                    subgroup: req.query.subgroup,
                };
                const members = await this.memberService.getAllMembers(filters);
                new apiResponse_1.ApiResponse(res, 200, "Members retrieved successfully", members);
            }
            catch (error) {
                next(error);
            }
        };
        this.getMemberById = async (req, res, next) => {
            try {
                const memberId = req.params.id;
                const member = await this.memberService.getMemberById(memberId);
                new apiResponse_1.ApiResponse(res, 200, "Member retrieved successfully", member);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateMember = async (req, res, next) => {
            try {
                const memberId = req.params.id;
                const memberData = req.body;
                const member = await this.memberService.updateMember(memberId, memberData);
                new apiResponse_1.ApiResponse(res, 200, "Member updated successfully", member);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteMember = async (req, res, next) => {
            try {
                const memberId = req.params.id;
                await this.memberService.deleteMember(memberId);
                new apiResponse_1.ApiResponse(res, 204, "Member deleted successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.getSubgroups = async (req, res, next) => {
            try {
                const subgroups = await this.memberService.getSubgroups();
                new apiResponse_1.ApiResponse(res, 200, "Subgroups retrieved successfully", ["All", ...subgroups]);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.MemberController = MemberController;
