import { z } from 'zod';

export class EventValidation {
  static readonly CREATE = z.object({
    name: z
      .string({
        error: "Event name must be a string!"
      })
      .min(3, {
        error: "Event name must be at least 3 characters long!"
      })
      .max(255, {
        error: "Event name must not exceed 255 characters!"
      }),
    
    location: z
      .string({
        error: "Location must be a string!"
      })
      .min(3, {
        error: "Location must be at least 3 characters long!"
      })
      .max(255, {
        error: "Location must not exceed 255 characters!"
      }),
    
    description: z
      .string({
        error: "Description must be a string!"
      })
      .min(10, {
        error: "Description must be at least 10 characters long!"
      }),
    
    photoUrl: z
      .string({
        error: "Photo URL must be a string!"
      })
      .url({
        error: "Photo URL must be a valid URL!"
      })
      .optional(),
    
    rating: z
      .number({
        error: "Rating must be a number!"
      })
      .min(0, {
        error: "Rating must be at least 0!"
      })
      .max(5, {
        error: "Rating must not exceed 5!"
      })
      .optional()
  });

  static readonly UPDATE = z.object({
    name: z
      .string({
        error: "Event name must be a string!"
      })
      .min(3, {
        error: "Event name must be at least 3 characters long!"
      })
      .max(255, {
        error: "Event name must not exceed 255 characters!"
      })
      .optional(),
    
    location: z
      .string({
        error: "Location must be a string!"
      })
      .min(3, {
        error: "Location must be at least 3 characters long!"
      })
      .max(255, {
        error: "Location must not exceed 255 characters!"
      })
      .optional(),
    
    description: z
      .string({
        error: "Description must be a string!"
      })
      .min(10, {
        error: "Description must be at least 10 characters long!"
      })
      .optional(),
    
    photoUrl: z
      .string({
        error: "Photo URL must be a string!"
      })
      .url({
        error: "Photo URL must be a valid URL!"
      })
      .optional(),
    
    rating: z
      .number({
        error: "Rating must be a number!"
      })
      .min(0, {
        error: "Rating must be at least 0!"
      })
      .max(5, {
        error: "Rating must not exceed 5!"
      })
      .optional()
  });

  static readonly ID_PARAM = z.object({
    id: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "Invalid event ID!"
      })
  });
}
