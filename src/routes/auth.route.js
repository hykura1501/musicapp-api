import { Router } from "express";
import { login, register, loginGoogle, loginFacebook} from "@/controllers/auth.controller";
import { loginRules, registerRules } from "@/validations/auth.rule";
import validate from "@/middlewares/validate";
const router = Router();

router.post("/login", validate(loginRules), login);

router.post("/register", validate(registerRules), register);

router.post("/login/google", loginGoogle)

router.post("/login/facebook", loginFacebook)


export default router;
