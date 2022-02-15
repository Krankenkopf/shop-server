import sequelize from "../../../s1-main/dbInit"
import { Model, Optional } from "sequelize"
import { DataTypes } from "sequelize"

export enum AccessLevel {
    UNREGISTERED = 0,
    REGISTERED = 1,
    ADMIN = 2,
    MASTER = 3
}

interface UserAttributes {
    id: number
    email: string
    password: string
    accessLevel: AccessLevel
    isActivated: boolean
    activationToken: string
}
interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "accessLevel" | "isActivated" | "activationToken"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    accessLevel: { type: DataTypes.SMALLINT, defaultValue: AccessLevel.REGISTERED },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationToken: { type: DataTypes.STRING }
})