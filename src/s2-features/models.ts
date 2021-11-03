import { DataTypes } from "sequelize/types"
import sequelize from "../s1-main/dbInit"
import { User } from "./f2-user/u2-models/userModel"

export const Cart = sequelize.define("cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const CartItem = sequelize.define("cart_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const ProductItem = sequelize.define("product_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: { type: DataTypes.STRING, allowNull: false },
})

export const ProductType = sequelize.define("product_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const ProductBrand = sequelize.define("product_brand", {
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
})

export const ProductTypeBrand = sequelize.define("type_brand", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)
 
ProductType.hasMany(ProductItem)
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
ProductBrand.belongsToMany(ProductType, {through: ProductTypeBrand})