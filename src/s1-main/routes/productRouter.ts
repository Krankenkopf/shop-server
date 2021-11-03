import { Router } from "express"
import productController from "../../s2-features/f1-auth/a1-controllers/productController"
import { accessLevelChecker } from "../../s4-middleware/accessLevelCheckerMdw"
import { authHandler } from "../../s4-middleware/authHandlerMdw"

export const productRouter = Router()

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getOne)
productRouter.post('/', authHandler, accessLevelChecker, productController.create)
productRouter.delete('/', authHandler, accessLevelChecker, productController.delete)