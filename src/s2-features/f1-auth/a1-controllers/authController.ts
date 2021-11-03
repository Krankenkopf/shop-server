import { AccessLevel} from '../../models';
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import jsonwebtoken, { Secret } from "jsonwebtoken"
import ApiError from './../../../s3-utils/apiError';
import { User } from "../../models";

export type TUserJwtData = {
    id: number
    email: string
    accessLevel: AccessLevel
}

export const generateJwt = (userData: TUserJwtData) => jsonwebtoken.sign(
    userData,
    process.env.SECRET_KEY as Secret,
    { expiresIn: 1800 }//1800sec
) 

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
        const verifiedUser = { id: user.id, email: user.email, accessLevel: user.accessLevel }
        const token = generateJwt(verifiedUser)
        return res.json({ ...verifiedUser, token })
    }
    
    async me(req: Request, res: Response, next: NextFunction) {
        const {id, email, accessLevel} = res.locals.jwt
        const token = generateJwt({id, email, accessLevel})
        return res.json({id, email, accessLevel, token})
    }
}

export default new AuthController()