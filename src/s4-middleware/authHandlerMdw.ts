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
            res.locals.jwt = { id: res.locals.unauthId, email: "unauth", accessLevel: 0, isActivated: false }
            next()
        } else if (!token) {
            res.locals.unauthId = unauthId
            res.locals.jwt = { id: unauthId, email: "unauth", accessLevel: 0, isActivated: false }
            next()
        } else {
            try {
                const decodedData = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET as Secret)
                console.log("this ", decodedData);
                res.locals.jwt = decodedData
                next()
            } catch (error) {
                res.locals.unauthId = unauthId ?? uuidV4()
                res.locals.jwt = { id: res.locals.unauthId, email: "unauth", accessLevel: 0, isActivated: false }
                next()
            }
        }
    } catch (error) {
        next(ApiError.unauthorized("Unauthenticated"))
    }
}