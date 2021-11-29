import { authHandler } from '../../s4-middleware/authHandlerMdw';
import { Router } from "express"
import authController from "./a2-controllers/authController"

export const authRouter = Router()

authRouter.get('/me', authHandler, authController.me) //auth/me
authRouter.post('/login', authController.login) //auth/login
authRouter.get('/logout', authHandler, authController.logout, authController.me) //auth/logout
authRouter.get('/activate/:token', authController.activate) //auth/activate
authRouter.get('/refresh', authController.refresh) //auth/refresh
