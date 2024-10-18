import { Router } from "express";
import { registerService } from "@/service/registerService";
import { loginService } from "@/service/loginService";
const router = Router();

router.post("/register", registerService);
router.post("/login", loginService);

export default router;
