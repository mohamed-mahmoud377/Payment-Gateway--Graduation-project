import {Subjects} from "@hashcash/common";


export interface APIKeyVerifiedEvent {
    subject:Subjects.APIKeyVerified;
    data:{
        checkoutSessionId:string;
        merchantId:string;
        isValid:boolean;

    }
}