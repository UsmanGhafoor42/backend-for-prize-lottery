import { verifyToken } from "@/middleware";
import { createPrize } from "@/service/createPrize";
import { createTicket } from "@/service/createTicket";
import { getPrize } from "@/service/getPrize";
import { getPrizeById } from "@/service/getPrizeById";
import { Router } from "express";
const router = Router();

router.use(verifyToken)

router.post("/prize", createPrize)
router.get("/get-prize", getPrize)
router.get("/get-prize/:id", getPrizeById)
router.post("/create-ticket", createTicket)

export default router;
