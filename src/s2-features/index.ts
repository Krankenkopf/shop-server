import { Router } from "express"
import { brandRouter } from "./f0-routes/brandRouter"
import { userRouter } from "./f2-user/userRouter"
import { productRouter } from "./f0-routes/productRouter"
import { typeRouter } from "./f0-routes/typeRouter"
import { authRouter } from "./f1-auth/authRouter"

export const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/type", typeRouter)
router.use("/brand", brandRouter)
router.use("/product", productRouter)