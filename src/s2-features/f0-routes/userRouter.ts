import { Router } from "express"
import userController from "../f2-user/u2-controllers/userController"
import { authHandler } from "../../s4-middleware/authHandlerMdw"

export const userRouter = Router()

userRouter.post('/register', userController.register) //user/register
userRouter.delete('/', authHandler, userController.delete)
