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

router.get("/masters", 
validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),getMasters);

router.get("/masters/:id", 
validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),getMaster);

router.get("/masterFind", 
validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),getMastersSurname);

router.get("/masterDoc", 
validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),getMastersDoc);

router.post(
  "/masters",
  validateSchema(CreateMasterSchema),passport.authenticate("jwt", { session: false }),
  createMaster
);

router.delete("/masters/:id", passport.authenticate("jwt", { session: false }), deleteMaster);

router.put("/masters/:id", passport.authenticate("jwt", { session: false }), updateMaster);

export default router;
