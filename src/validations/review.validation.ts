import { z } from "zod";

export class ReviewValidation {
  static readonly CREATE = z.object({
    eventId: z
      .number({
        error: "Event ID must be a number!",
      })
      .int({
        error: "Event ID must be an integer!",
      })
      .min(1, {
        error: "Valid event ID is required!",
      }),

    userName: z
      .string({
        error: "User name must be a string!",
      })
      .min(2, {
        error: "User name must be at least 2 characters long!",
      })
      .max(255, {
        error: "User name must not exceed 255 characters!",
      }),

    rating: z
      .number({
        error: "Rating must be a number!",
      })
      .min(1, {
        error: "Rating must be at least 1!",
      })
      .max(5, {
        error: "Rating must not exceed 5!",
      }),

    comment: z
      .string({
        error: "Comment must be a string!",
      })
      .min(5, {
        error: "Comment must be at least 5 characters long!",
      }),
  });

  static readonly UPDATE = z.object({
    userName: z
      .string({
        error: "User name must be a string!",
      })
      .min(2, {
        error: "User name must be at least 2 characters long!",
      })
      .max(255, {
        error: "User name must not exceed 255 characters!",
      })
      .optional(),

    rating: z
      .number({
        error: "Rating must be a number!",
      })
      .min(1, {
        error: "Rating must be at least 1!",
      })
      .max(5, {
        error: "Rating must not exceed 5!",
      })
      .optional(),

    comment: z
      .string({
        error: "Comment must be a string!",
      })
      .min(5, {
        error: "Comment must be at least 5 characters long!",
      })
      .optional(),
  });

  static readonly ID_PARAM = z.object({
    id: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "Invalid review ID!",
      }),
  });

  static readonly EVENT_ID_PARAM = z.object({
    eventId: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "Invalid event ID!",
      }),
  });
}
