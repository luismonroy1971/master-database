import { Router } from "express";
import passport from "passport";

const router = Router();

import {
  createMaster,
  getMaster,
  getMasters,
  updateMaster,
  getMastersSurname,
  getMastersDoc,
  deleteMaster
} from "../controllers/master.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { CreateMasterSchema } from "../schema/master.schema";

router.get("/masters",getMasters);

router.get("/masters/:id",getMaster);

router.get("/masterFind",getMastersSurname);

router.get("/masterDoc",getMastersDoc);

router.post(
  "/masters",
  validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),
  createMaster
);

router.delete("/masters/:id", passport.authenticate("jwt", { session: false }), deleteMaster);

router.put("/masters/:id", passport.authenticate("jwt", { session: false }), updateMaster);

export default router;
