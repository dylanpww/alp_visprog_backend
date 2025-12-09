import { Province } from "../../generated/prisma"

export interface ProvinceResponse {
    id: number
    name: string
}

export function toProvinceResponse(prismaProvince: Province): ProvinceResponse {
    return {
        id: prismaProvince.id,
        name: prismaProvince.name
    }
}

export function toProvinceResponseList(prismaProvinces: Province[]): ProvinceResponse[] {
    return prismaProvinces.map(province => toProvinceResponse(province))
}

export interface ProvinceCreateRequest {
    name: string
}

export interface ProvinceUpdateRequest {
    name: string
}