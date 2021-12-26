import { Cart } from "../c1-models/cartModel"


class CartService {
    async findCartById(userId: number) {
        return await Cart.findOne({ where: { userId } })
    }
}

export default new CartService()