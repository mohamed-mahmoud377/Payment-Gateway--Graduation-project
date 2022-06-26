import express, { Request, Response} from "express";
import {HandlerFactory, requireAuth, sendSuccess, validateRequest} from "@hashcash/common";
import {jwtGenerator} from "../utils/jwtGenerator";

import {Token, tokensDoc} from "../models/tokens";


const router = express.Router();


router.get('/tokens',
    requireAuth(),new HandlerFactory<tokensDoc>().getAll(Token))

export {router as getTokens}