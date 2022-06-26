import express, {Request, Response} from "express";
import {BadRequestError, HandlerFactory, NotFoundError, requireAuth, sendSuccess} from "@hashcash/common";
import {generateKey} from "../utils/generateKey";
import {Key, KeyDoc} from "../models/key";
import mongoose from "mongoose";



const router = express.Router();


router.get('/keys',requireAuth(),new HandlerFactory<KeyDoc>().getAll(Key))

export {router as getKeysRoute};