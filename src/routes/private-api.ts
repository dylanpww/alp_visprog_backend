import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.use((req, res, next) => {
    console.log("Private route accessed:", req.method, req.url)
    next() // Langsung next tanpa cek auth
})