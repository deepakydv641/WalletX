import exp from "express"
import userRouter from "./user.routes.js"
import accountRouter from "./account.routes.js"

const router = exp.Router();

router.use("/user", userRouter)

router.use("/account", accountRouter)

export default router