import { Router } from "express";
import passport from "passport";
import { signIn, signUp, updateInitial, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users", passport.authenticate("jwt", { session: false }), getUsers);

router.get("/users/:id",passport.authenticate("jwt", { session: false }), getUser);

router.post("/signup", passport.authenticate("jwt", { session: false }),  signUp);
router.post("/signin", signIn);
router.post("/updateinitial/:id", passport.authenticate("jwt", { session: false }),updateInitial);

export default router;
