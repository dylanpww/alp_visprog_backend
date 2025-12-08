import { NextFunction, Request, Response } from 'express'
import { CategoryService } from '../services/category-service'
import { CategoryCreateRequest, CategoryUpdateRequest } from '../models/category-model'

export class CategoryController {
    static async getAllCategories(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CategoryService.getAllCategories()
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const categoryId = Number(req.params.categoryId)
            const response = await CategoryService.getCategory(categoryId)
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CategoryCreateRequest
            const response = await CategoryService.createCategory(reqData)
            res.status(201).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as CategoryUpdateRequest
            const categoryId = Number(req.params.categoryId)
            const response = await CategoryService.updateCategory(
                reqData,
                categoryId
            )
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const categoryId = Number(req.params.categoryId)
            const response = await CategoryService.deleteCategory(categoryId)
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}