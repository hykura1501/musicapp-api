import { Router } from 'express';
import { login, register } from '@/controllers/auth.controller';
import { loginRules, registerRules } from '@/validations/auth.rule';
import validate from '@/middlewares/validate';
const router = Router();

router.post('/login', validate(loginRules), login);

router.post('/register', validate(registerRules), register);

export default router;
