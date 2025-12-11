import { Destination } from "../../generated/prisma"

export interface DestinationResponse {
    id: number
    name: string
    description: string
    location: string
    rating: number
    pictureUrl: string
    pictureUrl2: string
    categoryId: number
    provinceId: number
}

export function toDestinationResponse(prismaDestination: Destination): DestinationResponse {
    return {
        id: prismaDestination.id,
        name: prismaDestination.name,
        description: prismaDestination.description,
        location: prismaDestination.location,
        rating: prismaDestination.rating,
        pictureUrl: prismaDestination.pictureUrl,
        pictureUrl2: prismaDestination.pictureUrl2,
        categoryId: prismaDestination.categoryId,
        provinceId: prismaDestination.provinceId
    }
}

export function toDestinationResponseList(prismaDestinations: Destination[]): DestinationResponse[] {
    return prismaDestinations.map(destination => toDestinationResponse(destination))
}

export interface DestinationCreateRequest {
    name: string
    description: string
    location: string
    rating?: number
    pictureUrl: string
    pictureUrl2: string
    categoryId: number
    provinceId: number
}

export interface DestinationUpdateRequest {
    name?: string
    description?: string
    location?: string
    rating?: number
    pictureUrl?: string
    pictureUrl2?: string
    categoryId?: number
    provinceId?: number
}