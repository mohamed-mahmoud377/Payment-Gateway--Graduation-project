import express, {Request, Response} from "express";
import {BadRequestError, HandlerFactory, requireAuth, restrictTo} from "@hashcash/common";
import {User, UserDoc} from "../models/user";

import {Roles} from "../types/roles";


const router = express.Router();


router.get('/',requireAuth(),restrictTo([Roles.ADMIN]),new HandlerFactory<UserDoc>().getAll(User))

export {
    router as getUsersRoute
}