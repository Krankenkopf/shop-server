import { Cart, CartItem, UnauthCart, UnauthCartItem } from './../c1-models/cartModel'
import { Request, Response, NextFunction } from "express";
import tokenService from '../../f1-auth/a3-services/tokenService';
import ApiError from '../../../s3-utils/apiError'
import { AccessLevel, User } from "../../f2-user/u1-models/userModel";
import { resAddCookie } from '../../../s1-main/cookie';

class CartController {
    async get(req: Request, res: Response, next: NextFunction) {
        const { id, accessLevel } = res.locals.jwtData
        if (accessLevel === AccessLevel.UNREGISTERED) {
            let unauthCart = await UnauthCart.findOne({ where: { unauthUserId: id } })
            if (!unauthCart) {
                return next(ApiError.notFound("Cart not found"))
            }
            let unauthCartItems = await UnauthCartItem.findAll({ where: { cartId: unauthCart?.id } })
            if (!unauthCartItems) {
                return next(ApiError.notFound("Cart items not found"))
            }
            return res.json({
                data: unauthCartItems,
                info: []
            })
        }
        let user = await User.findOne({ where: { id } })
        if (!user) {
            return next(ApiError.notFound("User not found"))
        } 
        let cart = await Cart.findOne({ where: { userId: id } })
        if (!cart) {
            return next(ApiError.notFound("Cart not found"))
        }
        let cartItems = await CartItem.findAll({ where: { cartId: cart.id } })
        if (!cartItems) {
            return next(ApiError.notFound("Cart items not found"))
        }
        return res.json({
            data: cartItems,
            info: []
        })

    }
    async add(req: Request, res: Response, next: NextFunction) {
        const { id, accessLevel } = res.locals.jwtData
        const product = req.body.product
        if (accessLevel === AccessLevel.UNREGISTERED) {
            let unauthCart = await UnauthCart.findOne({ where: { unauthUserId: id } })
            if (!unauthCart) {
                return next(ApiError.notFound("Cart not found"))
            }
            let unauthCartItem = await UnauthCartItem.findOne({ where: { cartId: unauthCart?.id, code: product.code } })
            if (unauthCartItem) {
                return next(ApiError.badRequest("Item is already in cart"))
            }
            unauthCartItem = await UnauthCartItem.create({ cartId: unauthCart?.id, ...product })
            if (!unauthCartItem) {
                return next(ApiError.notFound("Error while creating item instance"))
            }
            return res.json({
                data: unauthCartItem,
                info: []
            })
        }
        let user = await User.findOne({ where: { id } })
        if (!user) {
            return next(ApiError.notFound("User not found"))
        }
        let cart = await Cart.findOne({ where: { userId: user?.id } })
        if (!cart) {
            return next(ApiError.notFound("Cart not found"))
        }
        let cartItem = await CartItem.findOne({ where: { cartId: cart?.id, code: product.code } })
        if (cartItem) {
            return next(ApiError.badRequest("Item is already in cart"))
        }
        cartItem = await CartItem.create({ cartId: cart?.id, ...product })
        if (!cartItem) {
            return next(ApiError.serverError("Error while creating item instance"))
        }
        return res.json({
            data: cartItem,
            info: []
        })
    }
    async edit(req: Request, res: Response, next: NextFunction) {
        const { id, accessLevel } = res.locals.jwtData
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        const { id, accessLevel } = res.locals.jwtData
        const code = req.query.code;
        if (accessLevel === AccessLevel.UNREGISTERED) {
            let unauthCartItem = await UnauthCartItem.findOne({ where: { code } })
            if (!unauthCartItem) {
                return next(ApiError.notFound("Item not found"))
            }
            await UnauthCartItem.destroy({ where: { code } })
            return res.json({
                data: unauthCartItem,
                info: []
            })
        }
        let cartItem = await CartItem.findOne({ where: { code } })
        if (!cartItem) {
            return next(ApiError.notFound("Item not found"))
        }
        await CartItem.destroy({ where: { code } })
        return res.json({
            data: cartItem,
            info: []
        })


    }
}

export default new CartController()