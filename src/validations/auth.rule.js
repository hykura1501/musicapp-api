import { body } from "express-validator"
export const registerRules = [
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	body('fullName').exists(),
]

export const loginRules = [
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
]
