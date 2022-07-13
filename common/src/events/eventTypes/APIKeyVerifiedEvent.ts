import {Subjects} from "../Subjects";


export interface APIKeyVerifiedEvent {
    subject:Subjects.APIKeyVerified;
    data:{
        checkoutSessionId:string;
        merchantId:string;
        isValid:boolean;

    }
}