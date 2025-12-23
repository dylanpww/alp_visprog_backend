import z, { ZodType } from "zod"

export class CategoryValidation {
    static readonly CREATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!"
            })
            .min(1, {
                error: "Name cannot be empty!"
            })
            .max(50, {
                error: "Name cannot exceed 50 characters!"
            }),
        icon: z
            .string({
                error: "Icon must be a string!"
            })
            .min(1, {
                error: "Icon cannot be empty!"
            })
            .max(100, {
                error: "Icon cannot exceed 100 characters!"
            })
    })

    static readonly UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!"
            })
            .min(1, {
                error: "Name cannot be empty!"
            })
            .max(50, {
                error: "Name cannot exceed 50 characters!"
            }),
        icon: z
            .string({
                error: "Icon must be a string!"
            })
            .min(1, {
                error: "Icon cannot be empty!"
            })
            .max(100, {
                error: "Icon cannot exceed 100 characters!"
            })
    })
}