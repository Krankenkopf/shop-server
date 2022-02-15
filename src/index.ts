require("dotenv").config() // first line!
import express, { NextFunction, Request, Response } from "express"
import sequelize from "./s1-main/dbInit"
import cors from "cors"
import fileUpload from "express-fileupload"
import path from "path"
import { router } from "./s2-features/f0-routes/index"
import {errorHandler} from "./s4-middleware/errorHanderMdw"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 5000

const corsOptions = {
    credentials: true,
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // if(whitelist.includes(origin || ""))
        //     return callback(null, true)
        // callback(new Error('Not allowed by CORS'));
        console.log("origin: ", origin);
        callback(null, true); // everyone is allowed
    }
};


const app = express()
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "..", "static", "images")))
// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Time: ", new Date().toString());
    console.log("-----", req.method, req.url, "params:", req.params);
    console.log("query:", req.query);
    console.log("body:", req.body);
    console.log("cookies:", req.cookies);
    //console.log("headers:", req.headers);
    //console.log("rawHeaders:", req.rawHeaders);
    next();
})
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

