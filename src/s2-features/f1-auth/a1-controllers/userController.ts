import { Cart } from '../../models';
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import ApiError from './../../../s3-utils/apiError';
import { User } from "../../models";
import { generateJwt } from './authController';

class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        const { email, password, accessLevel } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email/password'))
        }
        const registered = await User.findOne({ where: { email } })
        if (registered) {
            return next(ApiError.badRequest('Email already exists'))
        }
        const passHashed = await bcrypt.hash(password, 2)
        const user = await User.create({ email, password: passHashed, accessLevel })
        const cart = await Cart.create({ userId: user.id })
        const addedUser = { id: user.id, email: user.email, accessLevel: user.accessLevel }
        const token = generateJwt(addedUser)
        return res.json({ ...addedUser, token })
    }

    async delete(req: Request, res: Response, next: NextFunction) {

    }
}

export default new UserController()