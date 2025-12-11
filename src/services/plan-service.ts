import { prismaClient } from '../utils/database-util' 
import { 
    CreatePlanRequest, 
    UpdatePlanRequest 
} from '../models/plan-model'
import { ResponseError } from '../errors/response-error' 

export class PlanService {
    
    static async getAllPlans(userId: number) {
        return await prismaClient.plan.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                name: true,
                description: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    static async getPlan(planId: number) {
        const plan = await prismaClient.plan.findUnique({
            where: { id: planId },
            include: {
                destinations: {
                    include: {
                        destination: true
                    },
                    orderBy: {
                        id: 'asc' 
                    }
                }
            }
        })

        if (!plan) {
            throw new ResponseError(404, "Plan not found")
        }

        return plan
    }

    static async createPlan(request: CreatePlanRequest) {
        return await prismaClient.plan.create({
            data: {
                name: request.name,
                description: request.description,
                userId: request.userId
            }
        })
    }

    static async updatePlan(planId: number, request: UpdatePlanRequest) {
        const checkPlan = await prismaClient.plan.count({ where: { id: planId }})
        if (checkPlan === 0) throw new ResponseError(404, "Plan not found")

        return await prismaClient.plan.update({
            where: { id: planId },
            data: {
                name: request.name,
                description: request.description
            }
        })
    }

    static async deletePlan(planId: number) {
        const checkPlan = await prismaClient.plan.count({ where: { id: planId }})
        if (checkPlan === 0) throw new ResponseError(404, "Plan not found")

        return await prismaClient.plan.delete({
            where: { id: planId }
        })
    }

    static async addDestination(planId: number, destinationId: number) {
        const checkPlan = await prismaClient.plan.count({ where: { id: planId }})
        if (checkPlan === 0) throw new ResponseError(404, "Plan not found")

        const existing = await prismaClient.destinationPlan.findFirst({
            where: { planId, destinationId }
        })

        if (existing) {
            throw new ResponseError(400, "Destination already in this plan")
        }

        return await prismaClient.destinationPlan.create({
            data: {
                planId: planId,
                destinationId: destinationId,
                isVisited: false
            },
            include: {
                destination: true 
            }
        })
    }

    static async removeDestination(destinationPlanId: number) {
        const checkItem = await prismaClient.destinationPlan.findUnique({ where: { id: destinationPlanId }})
        if (!checkItem) throw new ResponseError(404, "Item not found in plan")

        return await prismaClient.destinationPlan.delete({
            where: { id: destinationPlanId }
        })
    }

    static async updateStatus(destinationPlanId: number, isVisited: boolean) {
        const checkItem = await prismaClient.destinationPlan.findUnique({ where: { id: destinationPlanId }})
        if (!checkItem) throw new ResponseError(404, "Item not found in plan")

        return await prismaClient.destinationPlan.update({
            where: { id: destinationPlanId },
            data: { isVisited: isVisited },
            include: { destination: true }
        })
    }
}