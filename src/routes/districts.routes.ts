import { Router } from "express";
import passport from "passport";

const router = Router();

import {
  createDistrict,
  getDistricts,
  getDistricts1,
} from "../controllers/district.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { CreateDistrictSchema } from "../schema/district.schema";

router.get("/districts", getDistricts);

router.get("/districtsfilter", getDistricts1);

router.post(
  "/districts",
  validateSchema(CreateDistrictSchema),passport.authenticate("jwt", { session: false }),
  createDistrict
);

export default router;
