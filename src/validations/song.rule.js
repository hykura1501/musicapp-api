import { body } from "express-validator"
export const createSongRules = [
	body('url').isURL(),
]