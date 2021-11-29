import {NextFunction, Request, Response} from "express";
import ApiError from "../s3-utils/apiError";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error handling middleware called");
    console.log("Path:", req.path);
    console.error("Error occured:", error);
    if (error instanceof ApiError) {
        console.log("Error is known");
        return res.status(error.status).json({ data: {},auth: {}, info: [error.message]})
    }
    return res.status(500).json({ data: {}, auth: {}, info: ["unpredicted server error"]})
}