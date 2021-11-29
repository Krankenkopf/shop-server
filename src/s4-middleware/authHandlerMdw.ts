import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { Secret } from "jsonwebtoken"
import { v4 as uuidV4 } from "uuid"
import ApiError from "../s3-utils/apiError";

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") next()
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const unauthId = req.cookies.unauthId
        if (!token && !unauthId) {
            res.locals.unauthId = uuidV4()
            res.locals.jwtData = { id: res.locals.unauthId, email: "unauth", accessLevel: 0, isActivated: false }
            return next()
        }
        if (!token) {
            res.locals.unauthId = unauthId
            res.locals.jwtData = { id: unauthId, email: "unauth", accessLevel: 0, isActivated: false }
            return next()
        }
        if (token) {
            try {
                const decodedData = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET as Secret)
                res.locals.jwt = token
                res.locals.jwtData = decodedData
                return next()
            } catch (error) {
                return next(ApiError.unauthorized("Token is expired or corrupted"))
            }
        }
    } catch (error) {
        return next(ApiError.unauthorized("Unauthenticated"))
    }
}