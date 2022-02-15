//import { ProductInfo, ProductType } from './models';
import ApiError from '../../s3-utils/apiError';
import { NextFunction, Request, Response } from "express";
import path from "path";
import { v4 as uuidV4}  from "uuid"
import { ProductItem } from "../models";
import { Model, ModelCtor } from 'sequelize/types';

type TUploadedImg = {
    img: {
        name: string
        data: Buffer
        size: number
        encoding: string
        tempFilePath: string,
        truncated: boolean,
        mimetype: string,
        md5: string,
        mv: Function
    }
}

interface ProductModel extends Model {
    id: number
    name: string
    price: string
    productBrandId: number
    productTypeId: number
    img: string
}

class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, productBrandId, productTypeId } = req.body
            let { info } = req.body
            if (req.files) {
                const { img } = req.files as unknown as TUploadedImg // TODO: questionable typing
                const imgName = `${uuidV4()}.jpg`
                img.mv(path.resolve(__dirname, "..", "..", "..", "..", "static", "images", imgName))
                const product: any = await ProductItem.create(  // TODO: fix any
                    { name, price, productBrandId, productTypeId, img: imgName }
                )
               /*  if (info) {
                    info = JSON.parse(info)
                    info.forEach((i: any) => {
                        ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: product.id
                        }
                        )
                    })

                } */
                return res.json(product)
            }
            return res.json({ message: "smth fckd" })

        } catch (error) {
            next(ApiError.badRequest((error as Error).message))
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductItem.findAll()
            res.json(products)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }

    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const product = await ProductItem.findOne({
                where: { id },
                //include: [{ model: ProductInfo, as: "info" }]
            }).catch((e: unknown) => res.json(e))
            res.json(product)
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.query
            const removed = await ProductItem.findOne({ where: { id } })
            await ProductItem.destroy({ where: { id } })
            res.json({ instance: removed, message: 'Instance deleted' })
        } catch (error) {
            next(ApiError.serverError("Smthfckd"))
        }
    }
}

export default new ProductController()