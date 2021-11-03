import { NextFunction, Request, Response } from "express";
import ApiError from "../s3-utils/apiError";

export const accessLevelChecker = (req: Request, res: Response, next: NextFunction) => {
    const { accessLevel } = res.locals.jwt
    if (accessLevel > 2) {
        next()
    } else {
        next(ApiError.accessForbidden("No sufficient rights to perform the operation"))
    }
}