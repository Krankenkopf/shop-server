import { Router } from "express"
import userController from "../f1-auth/a1-controllers/userController"
import { authHandler } from "../../s4-middleware/authHandlerMdw"

export const userRouter = Router()

userRouter.post('/register', userController.register) //user/register
userRouter.delete('/', authHandler, userController.delete)
