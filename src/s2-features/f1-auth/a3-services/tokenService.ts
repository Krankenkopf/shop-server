import { Token, TokenInstance } from './../a1-models/tokenModel';
import jsonwebtoken, { Secret } from "jsonwebtoken"
import { AccessLevel } from "../../f2-user/u1-models/userModel"

export type TUserJwtData = {
    id: number
    email: string
    accessLevel: AccessLevel
    isActivated: boolean
}

class TokenService {
    generateJwt(userData: TUserJwtData) {
        const accessToken = jsonwebtoken.sign(
            userData,
            process.env.JWT_ACCESS_SECRET as Secret,
            { expiresIn: 60 }//1800sec
        )
        const refreshToken = jsonwebtoken.sign(
            userData,
            process.env.JWT_REFRESH_SECRET as Secret,
            { expiresIn: "60d" }
        )
        return {accessToken, refreshToken}
    }

    async saveRefreshToken(userId: number, refreshToken: string) {
        let token = await Token.findOne<TokenInstance>({ where: { userId } })
        if (token) {
            token.refreshToken = refreshToken
            return await token.save()
        }
        return await Token.create({userId, refreshToken})
    }

    async findRefreshTokenById(userId: number) {
        return await Token.findOne<TokenInstance>({ where: { userId } })
    }

    async findRefreshTokenByToken(refreshToken: string) {
        return await Token.findOne<TokenInstance>({ where: { refreshToken } })
    }

    async deleteRefreshToken(userId: string) {
        await Token.destroy({where: {userId}})
    }
}

export default new TokenService()
