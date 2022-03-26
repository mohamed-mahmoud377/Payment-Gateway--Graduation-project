import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {checkPasswordRoute} from "./routes/checkPassword";
import {errorHandler} from "./middlewares/errorHandler";
import {signupRoute} from "./routes/signup";
import {otpRegister} from "./routes/otpRegister";
import {currentUser} from "./routes/currentUser";
const  cors = require('cors')
const app= express();

app.set('trust proxy',true);

app.use(bodyParser.json());
app.use(cors())
app.use(cookieSession({
    signed:false,
    secure: false// note that even in production you will have to disable it
}))

app.use("/api/users",currentUser)
app.use("/api/users",checkPasswordRoute);
app.use("/api/users",signupRoute);
app.use("/api/users",otpRegister);


app.use(errorHandler)

 export {app}