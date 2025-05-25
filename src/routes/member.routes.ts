import { Router } from "express";
import { MemberController } from "../controllers/member.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const memberController = new MemberController();

router.post("/", upload.single('image'), memberController.createMember);
router.put("/:id", upload.single('image'), memberController.updateMember);

router.get("/", memberController.getAllMembers);
router.get("/subgroups", memberController.getSubgroups);
router.get("/:id", memberController.getMemberById);
router.delete("/:id", memberController.deleteMember);

export default router;