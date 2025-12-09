import express from 'express'
import { UserController } from '../controllers/user-controller'
import { CategoryController } from '../controllers/category-controller'
import { ProvinceController } from '../controllers/province-controller'

export const publicRouter = express.Router()

publicRouter.post("/register", UserController.register)
publicRouter.post("/login", UserController.login)

publicRouter.get("/categories", CategoryController.getAllCategories);
publicRouter.get("/categories/:categoryId", CategoryController.getCategory);
publicRouter.post("/categories", CategoryController.createCategory);
publicRouter.put("/categories/:categoryId", CategoryController.updateCategory);
publicRouter.delete("/categories/:categoryId", CategoryController.deleteCategory);

publicRouter.get("/provinces", ProvinceController.getAllProvinces);
publicRouter.get("/provinces/:provinceId", ProvinceController.getProvince);
publicRouter.post("/provinces", ProvinceController.createProvince);
publicRouter.put("/provinces/:provinceId", ProvinceController.updateProvince);
publicRouter.delete("/provinces/:provinceId", ProvinceController.deleteProvince);