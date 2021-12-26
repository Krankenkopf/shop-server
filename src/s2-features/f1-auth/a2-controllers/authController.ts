import { TUserJwtData } from './../a3-services/tokenService'
import { resAddCookie, resClearCookie } from './../../../s1-main/cookie';
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import ApiError from './../../../s3-utils/apiError';
import { AccessLevel, User } from "../../f2-user/u1-models/userModel";
import { UnauthCart } from '../../f3-cart/c1-models/cartModel';
import tokenService from '../a3-services/tokenService';
import jsonwebtoken, { Secret } from "jsonwebtoken"
import { v4 as uuidV4 } from "uuid"



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
        await tokenService.saveRefreshToken(user.id, tokens.refreshToken)
        return resClearCookie(res, "unauthId")
            .json({
                data: { ...verifiedUser },
                auth: { ...tokens },
                info: []
            })
    }
    
    async me(req: Request, res: Response, next: NextFunction) {
        const { id, email, accessLevel, isActivated } = res.locals.jwtData
        if (accessLevel === AccessLevel.UNREGISTERED) {
            let unauthCart = await UnauthCart.findOne({ where: { unauthUserId: id } })
            if (!unauthCart) {
                unauthCart = await UnauthCart.create({unauthUserId: id})
            }
            await new Promise((res) => {
                setTimeout(() => {
                    res(0)
                }, 1000)
            })
            return resAddCookie(res).json({
                data: { id, accessLevel },
                auth: {},
                info: []
            })
        }
        const accessToken = res.locals.jwt
        const refreshTokenInstance = await tokenService.findRefreshTokenById(id)
        return resClearCookie(res, "unauthId")
            .json({
                data: { id, email, accessLevel, isActivated },
                auth: { accessToken, refreshToken: refreshTokenInstance?.refreshToken },
                info: []
            })
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const { id, accessLevel } = res.locals.jwtData
        if (accessLevel === AccessLevel.UNREGISTERED) {
            return res.json({
                data: { id, accessLevel },
                auth: {},
                info: ["Log out is not possible - you are not logged in"]
            })
        }
        await tokenService.deleteRefreshToken(id)
        res.locals.unauthId = uuidV4()
        res.locals.jwtData = { id: res.locals.unauthId, email: "unauth", accessLevel: 0, isActivated: false }
        return next()

    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (token) {
                try {         
                    const tokenInstance = await tokenService.findRefreshTokenByToken(token)      
                    const decodedData = tokenInstance && jsonwebtoken.verify(tokenInstance.refreshToken, process.env.JWT_REFRESH_SECRET as Secret)
                    const {id, email, accessLevel, isActivated} = decodedData as TUserJwtData
                    const tokens = tokenService.generateJwt({ id, email, accessLevel, isActivated })
                    await tokenService.saveRefreshToken(id, tokens.refreshToken)
                    return resClearCookie(res, "unauthId")
                        .json({
                            data: { id, email, accessLevel, isActivated },
                            auth: { ...tokens },
                            info: []
                        })
                } catch (error) {
                    return next(ApiError.unauthorized("Token is expired or corrupted"))
                }
            }
        } catch (error) {
            return next(ApiError.unauthorized("Unauthenticated"))
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController()