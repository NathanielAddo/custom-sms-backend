//routes/member.routes.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { MemberController } from "../controllers/member.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const memberController = new MemberController();

router.post("/", upload.single('image'), memberController.createMember);
router.put("/:id", upload.single('image'), memberController.updateMember);

router.get("/", authenticate, memberController.getAllMembers);
router.get("/subgroups",authenticate, memberController.getSubgroups);
router.get("/:id",authenticate, memberController.getMemberById);
router.delete("/:id",authenticate, memberController.deleteMember);

export default router;