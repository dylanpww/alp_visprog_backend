import { Province } from "../../generated/prisma"
import { ResponseError } from "../errors/response-error"
import { ProvinceCreateRequest, ProvinceUpdateRequest, ProvinceResponse, toProvinceResponse, toProvinceResponseList } from "../models/province-model"
import { prismaClient } from "../utils/database-util"
import { ProvinceValidation } from "../validations/province-validation"
import { Validation } from "../validations/validation"

export class ProvinceService {
    static async getAllProvinces(): Promise<ProvinceResponse[]> {
        const provinces = await prismaClient.province.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        return toProvinceResponseList(provinces)
    } 

    static async getProvince(provinceId: number): Promise<ProvinceResponse> {
        const province = await this.checkProvinceExists(provinceId)
        return toProvinceResponse(province)
    }

    static async checkProvinceExists(provinceId: number): Promise<Province> {
        const province = await prismaClient.province.findUnique({
            where: {
                id: provinceId
            }
        })

        if (!province) {
            throw new ResponseError(400, "Province not found!")
        }
        return province
    }

    static async createProvince(reqData: ProvinceCreateRequest): Promise<string> {
        const validatedData = Validation.validate(
            ProvinceValidation.CREATE,
            reqData
        )

        const existingProvince = await prismaClient.province.findUnique({
            where: {
                name: validatedData.name
            }
        })

        if (existingProvince) {
            throw new ResponseError(400, "Province name already exists!")
        }

        await prismaClient.province.create({
            data: {
                name: validatedData.name
            }
        })
        return "Province has been created successfully!"
    }

    static async updateProvince(
        req: ProvinceUpdateRequest,
        provinceId: number
    ): Promise<string> {
        const validatedData = Validation.validate(
            ProvinceValidation.UPDATE,
            req
        )

        await this.checkProvinceExists(provinceId)

        const existingProvince = await prismaClient.province.findFirst({
            where: {
                name: validatedData.name,
                NOT: {
                    id: provinceId
                }
            }
        })

        if (existingProvince) {
            throw new ResponseError(400, "Province name already exists!")
        }

        await prismaClient.province.update({
            where: {
                id: provinceId
            },
            data: {
                name: validatedData.name
            }
        })
        return "Province has been updated successfully!"
    }

    static async deleteProvince(provinceId: number): Promise<string> {
        await this.checkProvinceExists(provinceId)

        await prismaClient.destination.deleteMany({
            where: {
                provinceId: provinceId
            }
        })

        await prismaClient.province.delete({
            where: {
                id: provinceId
            }
        })
        return "Province and all related destinations have been deleted successfully!"
    }
}