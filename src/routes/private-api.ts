import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { PlanController } from "../controllers/plan-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get('/plans', PlanController.getAllPlans)
privateRouter.get('/plans/:planId', PlanController.getPlan)
privateRouter.post('/plans', PlanController.createPlan)
privateRouter.patch('/plans/:planId', PlanController.updatePlan)
privateRouter.delete('/plans/:planId', PlanController.deletePlan)
privateRouter.post('/plans/:planId/destinations', PlanController.addDestination)
privateRouter.delete('/plans/items/:id', PlanController.removeDestination)
privateRouter.patch('/plans/items/:id/status', PlanController.updateDestinationStatus)