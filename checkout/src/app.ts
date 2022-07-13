import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import {errorHandler, secure} from "@hashcash/common";

import cookieParser from "cookie-parser";
import {createCheckoutSessionRoute} from "./routes/createCheckoutSession";
import {getCheckoutSessionRoute} from "./routes/getCheckoutSeeion";
import {initRoute} from "./routes/init";
import {payRoute} from "./routes/pay";
import {ValidatePaymentRoute} from "./routes/validatePayment";



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
//     httpOnly:false,
//     secure: false,// note that even in production you will have to disable it because we are not https in prod yet
//
// }))

app.use(cookieParser())



app.use('/api/checkout',
    createCheckoutSessionRoute
    ,getCheckoutSessionRoute
    ,initRoute
    ,payRoute
,ValidatePaymentRoute)


app.use(errorHandler)

 export {app}