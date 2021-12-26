import { Router } from "express"
import { brandRouter } from "./brandRouter"
import { userRouter } from "./userRouter"
import { productRouter } from "./productRouter"
import { typeRouter } from "./typeRouter"
import { authRouter } from "./authRouter"
import { cartRouter } from "./cartRouter"

export const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/cart", cartRouter)
router.use("/type", typeRouter)
router.use("/brand", brandRouter)
router.use("/product", productRouter)