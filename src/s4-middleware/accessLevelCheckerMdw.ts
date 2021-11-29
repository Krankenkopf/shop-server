import { NextFunction, Request, Response } from "express";
import { AccessLevel } from "../s2-features/f2-user/u1-models/userModel";
import ApiError from "../s3-utils/apiError";

export const accessLevelChecker = (req: Request, res: Response, next: NextFunction) => {
    const { accessLevel } = res.locals.jwtData
    if (accessLevel >= AccessLevel.ADMIN) {
        next()
    } else {
        next(ApiError.accessForbidden("No sufficient rights to perform the operation"))
    }
}