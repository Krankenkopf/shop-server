import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { Secret } from "jsonwebtoken"
import ApiError from "../s3-utils/apiError";

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") next()
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            next(ApiError.unauthorized("Unauthenticated"))
        } else {
            const decodedData = jsonwebtoken.verify(token, process.env.SECRET_KEY as Secret)
            res.locals.jwt = decodedData
            next()
        }
        

    } catch (error) {
        next(ApiError.unauthorized("Unauthenticated"))
    }
}