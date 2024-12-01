import { body } from "express-validator"
export const createSongRules = [
	body("url").isURL(),
	body("title").exists(),
	body("duration").isNumeric(),
]