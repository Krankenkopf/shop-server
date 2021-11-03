import { accessLevelChecker } from './../../s4-middleware/accessLevelCheckerMdw';
import { authHandler } from './../../s4-middleware/authHandlerMdw';
import { Router } from "express"
import brandControler from "../../s2-features/f1-auth/a1-controllers/brandController"

export const brandRouter = Router()


brandRouter.get('/', brandControler.getAll)
brandRouter.post('/', authHandler, accessLevelChecker, brandControler.create)
brandRouter.delete('/', authHandler, accessLevelChecker, brandControler.delete)