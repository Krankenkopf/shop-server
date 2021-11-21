import { resCookie } from './../../../s1-main/cookie';
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import ApiError from './../../../s3-utils/apiError';
import { AccessLevel, User } from "../../f2-user/u1-models/userModel";
import { UnauthCart } from '../../f3-cart/c1-models/cartModel';
import tokenService from '../a3-services/tokenService';



class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email/password'))
        }
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Invalid email'))
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(ApiError.badRequest('Invalid email/password'))
        }
        const verifiedUser = { id: user.id, email: user.email, accessLevel: user.accessLevel, isActivated: user.isActivated }
        const tokens = tokenService.generateJwt(verifiedUser)
        return res.json({ data: { ...verifiedUser, ...tokens }, info: [] })
    }
    
    async me(req: Request, res: Response, next: NextFunction) {
        const { id, email, accessLevel, isActivated } = res.locals.jwt
        if (accessLevel === AccessLevel.UNREGISTERED) {
            let unauthCart = await UnauthCart.findOne({ where: { unauthUserId: id } })
            if (!unauthCart) {
                unauthCart = await UnauthCart.create({unauthUserId: id})
            }
            return resCookie(res).json({ data: { id, accessLevel }, info: [] })
        }
        const tokens = tokenService.generateJwt({id, email, accessLevel, isActivated})
        return res.json({ data: { id, email, accessLevel, ...tokens }, info: [] })
    }

    async logout(req: Request, res: Response, next: NextFunction) {}
    async refresh(req: Request, res: Response, next: NextFunction) {}
    async activate(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController()