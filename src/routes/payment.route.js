import { Router } from "express";
import { payment } from "@/controllers/payment.controller";

const router = Router();

router.post("/", payment);

export default router;
