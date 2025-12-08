import { Category } from "../../generated/prisma"

export interface CategoryResponse {
    id: number
    name: string
}

export function toCategoryResponse(prismaCategory: Category): CategoryResponse {
    return {
        id: prismaCategory.id,
        name: prismaCategory.name
    }
}

export function toCategoryResponseList(prismaCategories: Category[]): CategoryResponse[] {
    return prismaCategories.map(category => toCategoryResponse(category))
}

export interface CategoryCreateRequest {
    name: string
}

export interface CategoryUpdateRequest {
    name: string
}