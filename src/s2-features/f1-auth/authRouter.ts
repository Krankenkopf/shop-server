import { authHandler } from '../../s4-middleware/authHandlerMdw';
import { Router } from "express"
import authController from "./a1-controllers/authController"

export const authRouter = Router()


authRouter.get('/me', authHandler, authController.me) //auth/me
authRouter.post('/login', authController.login) //auth/login
