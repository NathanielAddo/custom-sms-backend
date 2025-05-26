"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//routes/member.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const member_controller_1 = require("../controllers/member.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const memberController = new member_controller_1.MemberController();
router.post("/", upload_middleware_1.upload.single('image'), memberController.createMember);
router.put("/:id", upload_middleware_1.upload.single('image'), memberController.updateMember);
router.get("/", auth_middleware_1.authenticate, memberController.getAllMembers);
router.get("/subgroups", auth_middleware_1.authenticate, memberController.getSubgroups);
router.get("/:id", auth_middleware_1.authenticate, memberController.getMemberById);
router.delete("/:id", auth_middleware_1.authenticate, memberController.deleteMember);
exports.default = router;
