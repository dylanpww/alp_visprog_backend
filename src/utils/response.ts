import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export const successResponse = <T>(res: Response, data: T, message?: string, statusCode: number = 200): void => {
  res.status(statusCode).json({
    success: true,
    data,
    ...(message && { message })
  });
};

export const createdResponse = <T>(res: Response, data: T, message: string = 'Resource created successfully'): void => {
  successResponse(res, data, message, 201);
};
