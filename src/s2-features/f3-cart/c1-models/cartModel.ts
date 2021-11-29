import { DataTypes } from "sequelize"
import sequelize from "../../../s1-main/dbInit"

export const UnauthCart = sequelize.define("cart_unauth", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    unauthUserId: {type: DataTypes.STRING, allowNull: false},
})

export const UnauthCartItem = sequelize.define("cart_unauth_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
})

export const Cart = sequelize.define("cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const CartItem = sequelize.define("cart_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
})