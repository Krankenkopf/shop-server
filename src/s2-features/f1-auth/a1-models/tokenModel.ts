import sequelize from "../../../s1-main/dbInit"
import { Model, Optional } from "sequelize"
import { DataTypes } from "sequelize"

interface TokenAttributes {
    userId: number
    refreshToken: string

}


export interface TokenInstance
  extends Model<TokenAttributes>,
    TokenAttributes {}

export const Token = sequelize.define<TokenInstance>("token", {
    userId: { type: DataTypes.INTEGER },
    refreshToken: { type: DataTypes.STRING, allowNull: false }
})