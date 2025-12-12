import { z, ZodType } from "zod"

export class PlanValidation {
    
    static readonly CREATE: ZodType = z.object({
        name: z
            .string({
                error: "Plan name must be a string!", 
            })
            .min(1, {
                message: "Plan name can not be empty!",
            })
            .max(150, {
                message: "Plan name must not exceed 150 characters!",
            }),
        description: z
            .string({
                error: "Description must be a string!",
            })
            .optional(),
    })
    static readonly UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Plan name must be a string!",
            })
            .min(1, {
                message: "Plan name can not be empty!",
            })
            .max(150, {
                message: "Plan name must not exceed 150 characters!",
            })
            .optional(),
        description: z
            .string({
                error: "Description must be a string!",
            })
            .optional(),
    })
    static readonly ADD_DESTINATION: ZodType = z.object({
        destinationId: z
            .number({
                error: "Destination ID must be a number!",
            })
            .positive({
                message: "Destination ID must be a positive number!",
            }),
    })
    static readonly UPDATE_STATUS: ZodType = z.object({
        isVisited: z.boolean({
            error: "isVisited must be a boolean (true/false)!",
        }),
    })
}