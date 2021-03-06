import {Token} from './f1-auth/a1-models/tokenModel';
import { DataTypes } from "sequelize"
import sequelize from "../s1-main/dbInit"
import { User } from "./f2-user/u1-models/userModel"
import { Cart, CartItem, UnauthCart, UnauthCartItem } from './f3-cart/c1-models/cartModel';

export const ProductItem = sequelize.define("product_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: { type: DataTypes.STRING, allowNull: false },
})

/* export const ProductType = sequelize.define("product_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
}) */

/* export const ProductBrand = sequelize.define("product_brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

export const ProductInfo = sequelize.define("product_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false}
}) */

/* export const ProductTypeBrand = sequelize.define("type_brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}) */

User.hasOne(Cart, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'cart',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Cart.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })

/* User.hasMany(Rating)
Rating.belongsTo(User) */

User.hasOne(Token, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'token',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Token.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
 
Cart.hasMany(CartItem, {
    sourceKey: 'id',
    foreignKey: 'cartId',
    as: 'cartItem',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
CartItem.belongsTo(Cart, { foreignKey: 'cartId', targetKey: 'id' })

UnauthCart.hasMany(UnauthCartItem, {
    sourceKey: 'id',
    foreignKey: 'cartId',
    as: 'cartItem',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
UnauthCartItem.belongsTo(UnauthCart, { foreignKey: 'cartId', targetKey: 'id' })

/* ProductType.hasMany(ProductItem)
ProductItem.belongsTo(ProductType)

ProductBrand.hasMany(ProductItem)
ProductItem.belongsTo(ProductBrand)

ProductItem.hasMany(Rating)
Rating.belongsTo(ProductItem)

ProductItem.hasMany(CartItem)
CartItem.belongsTo(ProductItem)

ProductItem.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(ProductItem)

ProductType.belongsToMany(ProductBrand, {through: ProductTypeBrand})
ProductBrand.belongsToMany(ProductType, {through: ProductTypeBrand}) */