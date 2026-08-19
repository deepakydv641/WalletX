import exp from "express"
import userRoutes from "./user.routes.js"

const router = exp.Router();

router.use("/user", userRoutes)

export default router