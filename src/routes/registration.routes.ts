//routes/registration.routes.ts
import { Router } from "express";
import { RegistrationController } from "../controllers/registration.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const registrationController = new RegistrationController();

router.post("/", registrationController.createRegistration);
router.post("/bulk", upload.single("file"), registrationController.bulkCreateRegistrations);
router.get("/", registrationController.getAllRegistrations);
router.get("/template", registrationController.downloadTemplate);
router.delete("/:id", registrationController.deleteRegistration);

export default router;