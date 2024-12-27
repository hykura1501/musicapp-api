import { Router } from "express";
import { login, register, loginGoogleCallback, loginGoogle} from "@/controllers/auth.controller";
import { loginRules, registerRules } from "@/validations/auth.rule";
import passport from "passport"
import validate from "@/middlewares/validate";
const router = Router();

router.post("/login", validate(loginRules), login);

router.post("/register", validate(registerRules), register);

router.post("/login/google", loginGoogle)

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  loginGoogleCallback
);

export default router;
