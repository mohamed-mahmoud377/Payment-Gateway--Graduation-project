import {Express} from "express";
const cors = require('cors')
import helmet from 'helmet'
const xss = require('xss-clean')
import rateLimit from 'express-rate-limit'
import express from 'express'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import compression from "compression";

export const secure = (app:Express,options={
    helmet:true,
    cors:true,
    rateLimiter:true,
    noSQLInjectionSanitization:true,
    xss:true,
    compression:true,
    bodyLimiting:true

})=>{

    const limiter = rateLimit({
        max: 400, // max 400 request
        windowMs: 60 * 60 * 1000, // in one hour
        message: "Too many requests"
    });

    //puts some really important  headers
    if (options.helmet)
        app.use(helmet());

    if(options.cors)
        app.use(cors())

    if (options.xss)
        app.use(xss())

    if (options.rateLimiter)
        app.use('/api',limiter)

    if(options.bodyLimiting){
        app.use(express.json({
            limit: '20kb' // limiting the size of the body
        }));
        app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    }
    if (options.noSQLInjectionSanitization){
        app.use(ExpressMongoSanitize())
    }

    if (options.compression){
        app.use(compression())
    }

}