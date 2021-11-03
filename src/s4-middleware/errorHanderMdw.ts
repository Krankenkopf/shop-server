import {NextFunction, Request, Response} from "express";
import ApiError from "../s3-utils/apiError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error handling middleware called");
    console.log("Path:", req.path);
    console.error("Error occured:", err);
    if (err instanceof ApiError) {
        console.log("Error is known");
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "unpredicted server error"})
}