import express from 'express'
import { UserController } from '../controllers/user-controller'
import { CategoryController } from '../controllers/category-controller'

export const publicRouter = express.Router()

publicRouter.post("/register", UserController.register)
publicRouter.post("/login", UserController.login)

// Category Routes
publicRouter.get("/categories", CategoryController.getAllCategories)
publicRouter.get("/categories/:categoryId", CategoryController.getCategory)
publicRouter.post("/categories", CategoryController.createCategory)
publicRouter.put("/categories/:categoryId", CategoryController.updateCategory)
publicRouter.delete("/categories/:categoryId", CategoryController.deleteCategory)