import { DataTypes, Model } from "sequelize"
import sequelizeInstance from "../../../s1-main/dbInit"

/* export const UnauthCart = sequelize.define("cart_unauth", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    unauthUserId: {type: DataTypes.STRING, allowNull: false},
})

export const UnauthCartItem = sequelize.define("cart_unauth_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    imgSrc: { type: DataTypes.STRING, allowNull: false },
    imgSrcAlt: { type: DataTypes.STRING, allowNull: false },
})

export const Cart = sequelize.define("cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const CartItem = sequelize.define("cart_item", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    imgSrc: { type: DataTypes.STRING, allowNull: false },
    imgSrcAlt: { type: DataTypes.STRING, allowNull: false },
}) */

const cartConfig = {
    tableName: 'carts',
    sequelize: sequelizeInstance,
}

const cartItemConfig = {
    tableName: 'cartItems',
    sequelize: sequelizeInstance,
}

export class Cart extends Model {
    public id!: number;
    public userId!: number;
    
}
Cart.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    cartConfig,
)

export class CartItem extends Model {
    public cartId!: number
    public code!: string
    public name!: string
    public color!: string
    public size!: string
    public quantity!: number
    public price!: number
    public imgSrc!: string
    public imgSrcAlt!: string
}

CartItem.init(
    {
        code: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
        imgSrc: { type: DataTypes.STRING, allowNull: false },
        imgSrcAlt: { type: DataTypes.STRING, allowNull: false },
    },
    cartItemConfig
)

//=====================================================

const unauthCartConfig = {
    tableName: 'unauthCarts',
    sequelize: sequelizeInstance,
}
const unauthCartItemConfig = {
    tableName: 'unauthCartItems',
    sequelize: sequelizeInstance,
}
export class UnauthCart extends Model {
    public id!: number;
    public unauthUserId!: string;

}
UnauthCart.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        unauthUserId: { type: DataTypes.STRING, allowNull: false },
    },
    unauthCartConfig,
)

export class UnauthCartItem extends Model {
    public cartId!: number
    public code!: string
    public name!: string
    public color!: string
    public size!: string
    public quantity!: number
    public price!: number
    public imgSrc!: string
    public imgSrcAlt!: string
}

UnauthCartItem.init(
    {
        code: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        color: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
        imgSrc: { type: DataTypes.STRING, allowNull: false },
        imgSrcAlt: { type: DataTypes.STRING, allowNull: false },
    },
    unauthCartItemConfig
)
