import { NextFunction, Response } from "express"
import { UserRequest } from "../models/user-request-model"
import { ResponseError } from "../errors/response-error"
import { verifyToken } from "../utils/jwt-util"

export const authMiddleware = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return next(new ResponseError(401, "Unauthorized user!"))
        }

        const payload = verifyToken(token!)

        if (payload) {
            req.user = payload
        } else {
            return next(new ResponseError(401, "Unauthorized user!"))
        }

        next()
    } catch (error : any) {
        if (error.name === "TokenExpiredError") {
            return next(new ResponseError(401, "Token expired, please login again"))
        }
        if (error.name === "JsonWebTokenError") {
            return next(new ResponseError(401, "Invalid token"))
        }
        next(new ResponseError(500, "Internal Server Error"))
    }
}
