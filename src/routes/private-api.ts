import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { CategoryController } from "../controllers/category-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

// Category Routes
privateRouter.get("/categories", CategoryController.getAllCategories);
privateRouter.get("/categories/:categoryId", CategoryController.getCategory);
privateRouter.post("/categories", CategoryController.createCategory);
privateRouter.put("/categories/:categoryId", CategoryController.updateCategory);
privateRouter.delete("/categories/:categoryId", CategoryController.deleteCategory);