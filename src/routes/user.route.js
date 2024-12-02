import { Router } from "express";
import { getMe, detailUser, updateMe } from "@/controllers/user.controller";
import authenticate from "@/middlewares/authenticate";
import multer from "multer";
import { uploadCloud } from "@/middlewares/uploadCloud";
const router = Router();

const upload = multer();

router.get("/me", authenticate, getMe);
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  uploadCloud("image"),
  updateMe
);
router.get("/profile/:userId", detailUser);

export default router;
