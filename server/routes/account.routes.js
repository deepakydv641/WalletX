import exp from "express"
import { getBalance,transfer } from "../controllers/account.controller.js";

const router = exp.Router();

router.get("/balance", getBalance)

router.get("/transfer", transfer)

export default router;