import { NextFunction, Request, Response } from 'express'
import { PlanService } from '../services/plan-service'
import { 
    CreatePlanRequest, 
    UpdatePlanRequest, 
    AddDestinationRequest, 
    UpdateDestinationStatusRequest,
    toPlanResponse
} from '../models/plan-model'
import { UserRequest } from '../models/user-request-model'

export class PlanController {

    static async getAllPlans(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw new Error("No user data found!")
            }
            const userId = req.user.id
            
            const response = await PlanService.getAllPlans(userId)
            
            res.status(200).json({
                data: response 
            })
        } catch (error) {
            next(error)
        }
    }

    static async getPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const planId = Number(req.params.planId)
            const planRaw = await PlanService.getPlan(planId)
            const response = toPlanResponse(planRaw)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async createPlan(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!req.user) {
                throw new Error("No user data found!")
            }
            const request = req.body as CreatePlanRequest
            request.userId = req.user!.id
            const response = await PlanService.createPlan(request)
            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async updatePlan(req: Request, res: Response, next: NextFunction) {
        try {
            const planId = Number(req.params.planId)
            const request = req.body as UpdatePlanRequest
            
            const response = await PlanService.updatePlan(planId, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async deletePlan(req: Request, res: Response, next: NextFunction) {
        try {
            const planId = Number(req.params.planId)
            await PlanService.deletePlan(planId)
            res.status(200).json({
                data: "Plan deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    static async addDestination(req: Request, res: Response, next: NextFunction) {
        try {
            const planId = Number(req.params.planId)
            const { destinationId } = req.body as AddDestinationRequest
            
            const response = await PlanService.addDestination(planId, destinationId)
            res.status(201).json({
                data: response,
                message: "Successfully added to planner"
            })
        } catch (error) {
            next(error)
        }
    }
    static async removeDestination(req: Request, res: Response, next: NextFunction) {
        try {
            const destinationPlanId = Number(req.params.id)
            await PlanService.removeDestination(destinationPlanId)
            res.status(200).json({
                data: "Item removed from plan"
            })
        } catch (error) {
            next(error)
        }
    }
    static async updateDestinationStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const destinationPlanId = Number(req.params.id)
            const { isVisited } = req.body as UpdateDestinationStatusRequest
            
            const response = await PlanService.updateStatus(destinationPlanId, isVisited)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}