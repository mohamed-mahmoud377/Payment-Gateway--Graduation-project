import express from "express";
import 'express-async-errors'
import bodyParser from 'body-parser'
import {errorHandler, secure} from "@hashcash/common";


import cookieParser from "cookie-parser";
import {getPaymentsRoute} from "./routes";
import {getPaymentRoute} from "./routes/show";
import { getBalanceRoute} from "./routes/balance";
import {paymentStatsRoute} from "./routes/paymentStats";
import {getMerchantPayments} from "./routes/admin/getMerchantpayments";


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


app.use(cookieParser())



app.use('/api/payment',
getPaymentsRoute
    ,getPaymentRoute
    ,getBalanceRoute
    ,paymentStatsRoute
    ,getMerchantPayments
)



app.use(errorHandler)

 export {app}