import express from "express";
import 'express-async-errors'
// import PinoHttp from "express-pino-logger";
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {checkPasswordRoute} from "./routes/checkPassword";
import {errorHandler, secure} from "@hashcash/common";
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
import {getUsersRoute} from "./routes/getUsers";
import {getUserRoute} from "./routes/getUser";
import {deactivateMerchantRoute} from "./routes/deactivateMerchant";
import {verifyEmailRoute} from "./routes/verifyEmail";
import {enableTwoFactorAuthRoute} from "./routes/enableTwoFactorAuth";
import cookieParser from "cookie-parser";


const app= express();

app.set('trust proxy',true);

app.use(bodyParser.json());


secure(app,{
    bodyLimiting: true,
    compression: true,
    cors: true,
    helmet: true,
    noSQLInjectionSanitization: true,
    rateLimiter: true,
    xss: true
})

// app.use(cookieSession({
//     sameSite:"lax",
//     signed:false,
//     httpOnly:true, // to prevent xss and means it can never be accessed by JS
//     secure: false// note that even in production you will have to disable it because we are not https in prod yet
// }))

app.use(cookieParser());

app.use('/api/users/admin/merchants',getUsersRoute)


app.use('/api/users/admin/merchants',getUserRoute)
app.use('/api/users/admin/merchants',deactivateMerchantRoute)


app.use("/api/users",verifyEmailRoute)
app.use("/api/users",currentUserRoute)
app.use("/api/users",signoutRoute)
app.use("/api/users",clearSessionsRoute)
app.use("/api/users",meRoute)
app.use('/api/users',otpResendRoute)
app.use('/api/users',enableTwoFactorAuthRoute)
app.use("/api/users",resetPasswordRoute)
app.use("/api/users",refreshAccessRoute)
app.use("/api/users",forgotPasswordRoute)
app.use("/api/users",loginRoute)
app.use("/api/users",checkPasswordRoute);
app.use("/api/users",signupRoute);
app.use("/api/users",otpRegisterRoute);

app.use(errorHandler)

 export {app}