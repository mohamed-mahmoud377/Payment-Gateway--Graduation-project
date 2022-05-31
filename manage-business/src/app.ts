import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from "cookie-session";
import {errorHandler, secure} from "@hashcash/common";
import {submitActivationRequestRoute} from "./routes/submitActivationRequest";
import {getMyActivationRequestRoute} from "./routes/getMyActivationRequest";



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
    sameSite:"lax",
    signed:false,
    httpOnly:true, // to prevent xss and means it can never be accessed by JS
    secure: false// note that even in production you will have to disable it because we are not https in prod yet
}))


app.use("/api/manage-business",submitActivationRequestRoute
,getMyActivationRequestRoute
)



app.use(errorHandler)

 export {app}