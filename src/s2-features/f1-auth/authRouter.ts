import { authHandler } from '../../s4-middleware/authHandlerMdw';
import { Router } from "express"
import authController from "./a2-controllers/authController"

export const authRouter = Router()

authRouter.get('/me', authHandler, authController.me) //auth/me
authRouter.post('/login', authController.login) //auth/login
authRouter.get('/logout', authController.logout) //auth/login
authRouter.get('/activate/:token', authController.activate) //auth/login
authRouter.get('/refresh', authController.refresh) //auth/login
