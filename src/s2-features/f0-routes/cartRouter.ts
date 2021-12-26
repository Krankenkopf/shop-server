import { Router } from "express"
import { authHandler } from "../../s4-middleware/authHandlerMdw"
import cartController from "../f3-cart/c2-controllers/cartController"

export const cartRouter = Router()


cartRouter.get('/', authHandler, cartController.get) 
cartRouter.post('/', authHandler, cartController.add) 
cartRouter.put('/', authHandler, cartController.edit) 
cartRouter.delete('/', authHandler, cartController.delete)