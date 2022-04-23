import express from "express";
import 'express-async-errors'

import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {errorHandler, secure} from "@hashcash/common";
import {logRoute} from "./routes/login";
import {otpRegisterRoute} from "./routes/otpRegister";


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

app.use(cookieSession({
    signed:false,
    secure: false// note that even in production you will have to disable it
}))


app.use('/api/kms',logRoute)
app.use('/api/kms',otpRegisterRoute)
app.use(errorHandler)

 export {app}