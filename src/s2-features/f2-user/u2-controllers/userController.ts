import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import tokenService from '../../f1-auth/a3-services/tokenService';
import ApiError from '../../../s3-utils/apiError'
import { User } from '../u1-models/userModel';
import { Cart } from "../../f3-cart/c1-models/cartModel";

class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email/password'))
        }
        const registered = await User.findOne({ where: { email } })
        if (registered) {
            return next(ApiError.badRequest('Email already exists'))
        }
        const passHashed = await bcrypt.hash(password, 2)
        const user = await User.create({ email, password: passHashed })
        await Cart.create({userId: user.id})
        const addedUser = { id: user.id, email: user.email, accessLevel: user.accessLevel, isActivated: user.isActivated}
        const tokens = tokenService.generateJwt(addedUser)
        await tokenService.saveRefreshToken(addedUser.id, tokens.refreshToken)
        return res.json({ data: { ...addedUser }, auth: {...tokens}, info: [] })
    }

    async delete(req: Request, res: Response, next: NextFunction) {

    }
}

export default new UserController()