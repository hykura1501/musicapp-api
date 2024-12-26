import { Router } from "express";
import { login, register, loginGoogleCallback } from "@/controllers/auth.controller";
import { loginRules, registerRules } from "@/validations/auth.rule";
import passport from "passport"
import validate from "@/middlewares/validate";
const router = Router();

router.post("/login", validate(loginRules), login);

router.post("/register", validate(registerRules), register);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  loginGoogleCallback
);

export default router;
