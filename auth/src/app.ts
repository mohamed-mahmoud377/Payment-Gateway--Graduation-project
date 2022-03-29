import express from "express";
import 'express-async-errors'
// import PinoHttp from "express-pino-logger";
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {checkPasswordRoute} from "./routes/checkPassword";
import {errorHandler} from "./middlewares/errorHandler";
import {signupRoute} from "./routes/signup";
import {otpRegister} from "./routes/otpRegister";
import {currentUser} from "./routes/currentUser";
import {loginRoute} from "./routes/login";
import {forgotPassword} from "./routes/forgotPassword";
import {resetPassword} from "./routes/resetPassword";
import {refreshAccessRoute} from "./routes/refreshAccess";
import {otpResendRoute} from "./routes/otpResend";

const  cors = require('cors')
const app= express();

app.set('trust proxy',true);

app.use(bodyParser.json());
app.use(cors())
app.use(cookieSession({
    signed:false,
    secure: false// note that even in production you will have to disable it
}))

// app.use(PinoHttp)



app.use("/api/users",currentUser)
app.use('/api/users',otpResendRoute)
app.use("/api/users",resetPassword)
app.use("/api/users",refreshAccessRoute)
app.use("/api/users",forgotPassword)
app.use("/api/users",loginRoute)
app.use("/api/users",checkPasswordRoute);
app.use("/api/users",signupRoute);
app.use("/api/users",otpRegister);

app.use(errorHandler)

 export {app}