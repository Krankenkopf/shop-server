import { Router } from "express"
import productController from "../f4-product/productController"
import { accessLevelChecker } from "../../s4-middleware/accessLevelCheckerMdw"
import { authHandler } from "../../s4-middleware/authHandlerMdw"

export const productRouter = Router()

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getOne)
productRouter.post('/', authHandler, accessLevelChecker, productController.create)
productRouter.delete('/', authHandler, accessLevelChecker, productController.delete)