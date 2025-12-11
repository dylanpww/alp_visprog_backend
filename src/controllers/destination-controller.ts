import { NextFunction, Response } from "express"
import { UserRequest } from "../models/user-request-model"
import { DestinationService } from "../services/destination-service"
import { DestinationCreateRequest, DestinationUpdateRequest } from "../models/destination-model"

export class DestinationController {
    
    static async list(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await DestinationService.list()

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ) {
        try {
            const destinationId = Number(req.params.destinationId)

            const response = await DestinationService.get(destinationId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async create(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request = req.body as DestinationCreateRequest
            const response = await DestinationService.create(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request = req.body as DestinationUpdateRequest
            const destinationId = Number(req.params.destinationId)

            const response = await DestinationService.update(
                destinationId, 
                request
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async remove(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const destinationId = Number(req.params.destinationId)

            const response = await DestinationService.remove(destinationId)

            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
}