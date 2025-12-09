import { Category } from "../../generated/prisma"
import { ResponseError } from "../errors/response-error"
import { CategoryCreateRequest, CategoryUpdateRequest, CategoryResponse, toCategoryResponse, toCategoryResponseList } from "../models/category-model"
import { prismaClient } from "../utils/database-util"
import { CategoryValidation } from "../validations/category-validation"
import { Validation } from "../validations/validation"

export class CategoryService {
    static async getAllCategories(): Promise<CategoryResponse[]> {
        const categories = await prismaClient.category.findMany({
            orderBy: {
                name: 'desc'
            }
        })
        return toCategoryResponseList(categories)
    } 

    static async getCategory(categoryId: number): Promise<CategoryResponse> {
        const category = await this.checkCategoryExists(categoryId)
        return toCategoryResponse(category)
    }

    static async checkCategoryExists(categoryId: number): Promise<Category> {
        const category = await prismaClient.category.findUnique({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new ResponseError(400, "Category not found!")
        }
        return category
    }

    static async createCategory(reqData: CategoryCreateRequest): Promise<string> {
        const validatedData = Validation.validate(
            CategoryValidation.CREATE,
            reqData
        )

        const existingCategory = await prismaClient.category.findUnique({
            where: {
                name: validatedData.name
            }
        })

        if (existingCategory) {
            throw new ResponseError(400, "Category name already exists!")
        }

        await prismaClient.category.create({
            data: {
                name: validatedData.name
            }
        })
        return "Category has been created successfully!"
    }

    static async updateCategory(
        req: CategoryUpdateRequest,
        categoryId: number
    ): Promise<string> {
        const validatedData = Validation.validate(
            CategoryValidation.UPDATE,
            req
        )

        await this.checkCategoryExists(categoryId)

        const existingCategory = await prismaClient.category.findFirst({
            where: {
                name: validatedData.name,
                NOT: {
                    id: categoryId
                }
            }
        })

        if (existingCategory) {
            throw new ResponseError(400, "Category name already exists!")
        }

        await prismaClient.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: validatedData.name
            }
        })
        return "Category has been updated successfully!"
    }

    static async deleteCategory(categoryId: number): Promise<string> {
        await this.checkCategoryExists(categoryId)

        await prismaClient.destination.deleteMany({
            where: {
                categoryId: categoryId
            }
        })

        await prismaClient.category.delete({
            where: {
                id: categoryId
            }
        })
        return "Category and all related destinations have been deleted successfully!"
    }
}