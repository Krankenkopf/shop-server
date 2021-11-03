import { Router } from "express"
import { brandRouter } from "../s1-main/routes/brandRouter"
import { userRouter } from "./f2-user/userRouter"
import { productRouter } from "../s1-main/routes/productRouter"
import { typeRouter } from "../s1-main/routes/typeRouter"
import { authRouter } from "./f1-auth/authRouter"

export const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/type", typeRouter)
router.use("/brand", brandRouter)
router.use("/product", productRouter)