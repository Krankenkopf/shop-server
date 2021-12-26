import {NextFunction, Request, Response} from "express";
//import { ProductBrand } from "./models";
import ApiError from "../../s3-utils/apiError";

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            //const brand = await ProductBrand.create({ name })
            //res.json(brand)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            //const brands = await ProductBrand.findAll()
            //res.json(brands)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.query
            //const removed = await ProductBrand.findOne({ where: { id } })
            //await ProductBrand.destroy({ where: { id } })
            //res.json({instance: removed, message: 'Instance deleted'})
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
}

export default new BrandController()