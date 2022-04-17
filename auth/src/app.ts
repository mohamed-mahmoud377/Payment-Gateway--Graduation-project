import express from "express";
import 'express-async-errors'
// import PinoHttp from "express-pino-logger";
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {checkPasswordRoute} from "./routes/checkPassword";
import {errorHandler} from "./middlewares/errorHandler";
import {signupRoute} from "./routes/signup";
import {otpRegisterRoute} from "./routes/otpRegister";
import {currentUserRoute} from "./routes/currentUser";
import {loginRoute} from "./routes/login";
import {forgotPasswordRoute} from "./routes/forgotPassword";
import {resetPasswordRoute} from "./routes/resetPassword";
import {refreshAccessRoute} from "./routes/refreshAccess";
import {otpResendRoute} from "./routes/otpResend";
import {meRoute} from "./routes/me";
import {clearSessionsRoute} from "./routes/clearSessions";
import {signoutRoute} from "./routes/signout";

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



app.use("/api/users",currentUserRoute)
app.use("/api/users",signoutRoute)
app.use("/api/users",clearSessionsRoute)
app.use("/api/users",meRoute)
app.use('/api/users',otpResendRoute)
app.use("/api/users",resetPasswordRoute)
app.use("/api/users",refreshAccessRoute)
app.use("/api/users",forgotPasswordRoute)
app.use("/api/users",loginRoute)
app.use("/api/users",checkPasswordRoute);
app.use("/api/users",signupRoute);
app.use("/api/users",otpRegisterRoute);

app.use(errorHandler)

 export {app}