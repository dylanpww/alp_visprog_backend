import { NextFunction, Request, Response } from 'express'
import { ProvinceService } from '../services/province-service'
import { ProvinceCreateRequest, ProvinceUpdateRequest } from '../models/province-model'

export class ProvinceController {
    static async getAllProvinces(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await ProvinceService.getAllProvinces()

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async getProvince(req: Request, res: Response, next: NextFunction) {
        try {
            const provinceId = Number(req.params.provinceId)

            const response = await ProvinceService.getProvince(provinceId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createProvince(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as ProvinceCreateRequest

            const response = await ProvinceService.createProvince(reqData)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProvince(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as ProvinceUpdateRequest
            const provinceId = Number(req.params.provinceId)

            const response = await ProvinceService.updateProvince(
                reqData,
                provinceId
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProvince(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const provinceId = Number(req.params.provinceId)

            const response = await ProvinceService.deleteProvince(provinceId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}