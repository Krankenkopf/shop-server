import { Router } from "express"
import typeController from "../../s2-features/f1-auth/a1-controllers/typeController"
import { accessLevelChecker } from "../../s4-middleware/accessLevelCheckerMdw"
import { authHandler } from "../../s4-middleware/authHandlerMdw"


export const typeRouter = Router()


typeRouter.get('/', typeController.getAll)
typeRouter.post('/', authHandler, accessLevelChecker, typeController.create)
typeRouter.delete('/', authHandler, accessLevelChecker, typeController.delete)