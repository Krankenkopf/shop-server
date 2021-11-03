require("dotenv").config() // first line!
import express from "express"
import sequelize from "./s1-main/dbInit"
import cors from "cors"
import fileUpload from "express-fileupload"
import path from "path"
import { router } from "./s2-features/index"
import {errorHandler} from "./s4-middleware/errorHanderMdw"

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "..", "static", "images")))
app.use("/api", router)

//--------------------
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log("Server started at port " + PORT))
    } catch (error) {
        console.log(error)
    }
}

start()

