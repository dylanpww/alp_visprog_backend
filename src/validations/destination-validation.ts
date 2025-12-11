import { z, ZodType } from "zod"

export class DestinationValidation {
    static readonly CREATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!",
            })
            .min(1, {
                message: "Name can not be empty!",
            })
            .max(150, {
                message: "Name must not exceed 150 characters!",
            }),
        description: z
            .string({
                error: "Description is required!",
            })
            .min(1, {
                message: "Description can not be empty!",
            }),
        location: z
            .string({
                error: "Location is required!",
            })
            .min(1, {
                message: "Location can not be empty!",
            })
            .max(200, {
                message: "Location must not exceed 200 characters!",
            }),
        rating: z
            .number({
                error: "Rating must be a number!",
            })
            .min(0, {
                message: "Rating must be at least 0!",
            })
            .max(5, {
                message: "Rating cannot exceed 5!",
            })
            .optional(),
        pictureUrl: z
            .string({
                error: "Picture URL is required!",
            })
            .max(255, {
                message: "Picture URL must not exceed 255 characters!",
            }),
        pictureUrl2: z
            .string({
                error: "Picture URL 2 is required!",
            })
            .max(255, {
                message: "Picture URL 2 must not exceed 255 characters!",
            }),
        categoryId: z
            .number({
                error: "Category ID is required!",
            })
            .positive({
                message: "Category ID must be a positive number!",
            }),
        provinceId: z
            .number({
                error: "Province ID is required!",
            })
            .positive({
                message: "Province ID must be a positive number!",
            }),
    })

    static readonly UPDATE: ZodType = z.object({
        name: z
            .string({
                error: "Name must be a string!",
            })
            .min(1, {
                message: "Name can not be empty!",
            })
            .max(150, {
                message: "Name must not exceed 150 characters!",
            })
            .optional(),
        description: z
            .string({
                error: "Description must be a string!",
            })
            .min(1, {
                message: "Description can not be empty!",
            })
            .optional(),
        location: z
            .string({
                error: "Location must be a string!",
            })
            .min(1, {
                message: "Location can not be empty!",
            })
            .max(200, {
                message: "Location must not exceed 200 characters!",
            })
            .optional(),
        rating: z
            .number({
                error: "Rating must be a number!",
            })
            .min(0, {
                message: "Rating must be at least 0!",
            })
            .max(5, {
                message: "Rating cannot exceed 5!",
            })
            .optional(),
        pictureUrl: z
            .string({
                error: "Picture URL must be a string!",
            })
            .max(255, {
                message: "Picture URL must not exceed 255 characters!",
            })
            .optional(),
        pictureUrl2: z
            .string({
                error: "Picture URL 2 must be a string!",
            })
            .max(255, {
                message: "Picture URL 2 must not exceed 255 characters!",
            })
            .optional(),
        categoryId: z
            .number({
                error: "Category ID must be a number!",
            })
            .positive({
                message: "Category ID must be a positive number!",
            })
            .optional(),
        provinceId: z
            .number({
                error: "Province ID must be a number!",
            })
            .positive({
                message: "Province ID must be a positive number!",
            })
            .optional(),
    })
}