import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { CategoryController } from "../controllers/category-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)