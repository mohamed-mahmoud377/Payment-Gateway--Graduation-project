import express, {Request, Response} from "express";
import {HandlerFactory, NotFoundError, requireAuth, restrictTo, sendSuccess} from "@hashcash/common";
import {User, UserDoc} from "../models/user";
import {Roles} from "../types/roles";



const router = express.Router();

router.get('/:id',requireAuth(),restrictTo([Roles.ADMIN]),new HandlerFactory<UserDoc>().getOne(User,undefined))


export {
    router as getUserRoute
}