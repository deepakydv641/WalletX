import exp from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { signup, login, updateUser ,searchUser } from "../controllers/user.controller.js"

const router = exp.Router()

// signup
router.post("/signup", signup)

// login
router.post("/login", login)

// update
router.put("/update", authMiddleware, updateUser)

router.get("/search", authMiddleware, searchUser)

export default router