import { Plan, DestinationPlan, Destination } from "../../generated/prisma"
import { toDestinationResponse, DestinationResponse } from "./destination-model"



export interface CreatePlanRequest {
    name: string
    description?: string 
    userId: number 
}

export interface UpdatePlanRequest {
    name?: string
    description?: string 
}

export interface AddDestinationRequest {
    destinationId: number
}

export interface UpdateDestinationStatusRequest {
    isVisited: boolean
}



//buat destination di plan
export interface PlanItemResponse extends DestinationResponse {
    destinationPlanId: number
    isVisited: boolean
}

//isi dari plan
export interface PlanResponse {
    id: number
    name: string
    description: string | null
    destinations: PlanItemResponse[] //array biar bisa simpen banyak destination
}

export function toPlanResponse(
    plan: Plan & { destinations?: (DestinationPlan & { destination: Destination })[] }
): PlanResponse {
    return {
        id: plan.id,
        name: plan.name,
        description: plan.description || null, //description bisa null
        
        destinations: plan.destinations 
            ? plan.destinations.map(item => {
                //ambil data dari destinationRespnose
                const destinationData = toDestinationResponse(item.destination)

                //gabung sama data dari destinationPlan
                return {
                    ...destinationData, //semua data dari destination
                    destinationPlanId: item.id,
                    isVisited: item.isVisited
                }
            })
            : [] //array kosong kalo ga ada isi
    }
}