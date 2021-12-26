//import { ProductType } from './models';
import {Request, Response, NextFunction} from "express";
import ApiError from "../../s3-utils/apiError"

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            //const type = await ProductType.create({name})
            //res.json(type)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
        
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            //const types = await ProductType.findAll()
            //res.json(types)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.query.id
            if (!id) {
                return next(ApiError.badRequest('id is not defined'))
            }
            //const removed = await ProductType.findOne({where: {id}})
            //await ProductType.destroy({ where: { id } })
            //res.json({instance: removed, message: "Instance deleted"})
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
}

export default new TypeController()