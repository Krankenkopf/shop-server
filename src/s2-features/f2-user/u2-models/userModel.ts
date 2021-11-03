import sequelize from "../../../s1-main/dbInit"
import { DataTypes, Model, Optional } from "sequelize"

export enum AccessLevel {
    "unregistered" = 0,
    "registered" = 1,
    "admin" = 2,
    "master" = 3
}

interface UserAttributes {
    id: number
    email: string
    password: string
    accessLevel: AccessLevel
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define<UserInstance>("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    accessLevel: { type: DataTypes.SMALLINT, defaultValue: 1},
})