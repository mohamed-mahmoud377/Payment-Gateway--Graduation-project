import {randomBytes} from "crypto";
import {Modes} from "@hashcash/common";

export const generateKey = (mode:string)=>{
    if (mode===Modes.TEST)
        return `sk_test_${randomBytes(64).toString('hex')}`
    if (mode===Modes.LIVE)
        return `sk_Live_${randomBytes(64).toString('hex')}`

    throw new Error("wrong mode is entered")
}