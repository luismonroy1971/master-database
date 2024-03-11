import { Router } from "express";
import passport from "passport";

const router = Router();

import {
  createProvince,
  getProvinces,
  getProvinces1,
} from "../controllers/province.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { CreateProvinceSchema } from "../schema/province.schema";

router.get("/provinces", getProvinces);

router.get("/provincesfilter", getProvinces1);

router.post(
  "/provinces",
  validateSchema(CreateProvinceSchema),passport.authenticate("jwt", { session: false }),
  createProvince
);

export default router;
