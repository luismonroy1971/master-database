import { Router } from "express";
import passport from "passport";

const router = Router();

import {
  createDepartment,
  getDepartments,
  getDepartments1,
} from "../controllers/department.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { CreateDepartmentSchema } from "../schema/department.schema";

router.get("/departments", getDepartments);

router.get("/departmentsfilter", getDepartments1);

router.post(
  "/departments",
  validateSchema(CreateDepartmentSchema),passport.authenticate("jwt", { session: false }),
  createDepartment
);

export default router;
