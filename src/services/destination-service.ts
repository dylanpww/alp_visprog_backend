import { prismaClient } from "../utils/database-util"
import { ResponseError } from "../errors/response-error"
import {
    DestinationCreateRequest,
    DestinationResponse,
    DestinationUpdateRequest,
    toDestinationResponse,
    toDestinationResponseList
} from "../models/destination-model"
import { DestinationValidation } from "../validations/destination-validation"
import { Validation } from "../validations/validation"

export class DestinationService {

    static async create(request: DestinationCreateRequest): Promise<DestinationResponse> {
        const createRequest = Validation.validate(DestinationValidation.CREATE, request)

        const categoryCount = await prismaClient.category.count({
            where: { id: createRequest.categoryId }
        })
        if (categoryCount === 0) {
            throw new ResponseError(404, "Category is not found")
        }

        const provinceCount = await prismaClient.province.count({
            where: { id: createRequest.provinceId }
        })
        if (provinceCount === 0) {
            throw new ResponseError(404, "Province is not found")
        }

        const destination = await prismaClient.destination.create({
            data: createRequest
        })

        return toDestinationResponse(destination)
    }

    static async get(id: number): Promise<DestinationResponse> {
        const destination = await prismaClient.destination.findUnique({
            where: { id: id }
        })

        if (!destination) {
            throw new ResponseError(404, "Destination is not found")
        }

        return toDestinationResponse(destination)
    }

    static async update(id: number, request: DestinationUpdateRequest): Promise<DestinationResponse> {
        const updateRequest = Validation.validate(DestinationValidation.UPDATE, request)

        const checkDestination = await prismaClient.destination.count({
            where: { id: id }
        })

        if (checkDestination === 0) {
            throw new ResponseError(404, "Destination is not found")
        }

        if (updateRequest.categoryId) {
            const categoryCount = await prismaClient.category.count({
                where: { id: updateRequest.categoryId }
            })
            if (categoryCount === 0) throw new ResponseError(404, "Category is not found")
        }

        if (updateRequest.provinceId) {
            const provinceCount = await prismaClient.province.count({
                where: { id: updateRequest.provinceId }
            })
            if (provinceCount === 0) throw new ResponseError(404, "Province is not found")
        }

        const destination = await prismaClient.destination.update({
            where: { id: id },
            data: updateRequest
        })

        return toDestinationResponse(destination)
    }

    static async remove(id: number): Promise<DestinationResponse> {
        const checkDestination = await prismaClient.destination.findUnique({
            where: { id: id }
        })

        if (!checkDestination) {
            throw new ResponseError(404, "Destination is not found")
        }

        const destination = await prismaClient.destination.delete({
            where: { id: id }
        })

        return toDestinationResponse(destination)
    }

    static async list(): Promise<Array<DestinationResponse>> {
        const destinations = await prismaClient.destination.findMany()
        return toDestinationResponseList(destinations)
    }
}