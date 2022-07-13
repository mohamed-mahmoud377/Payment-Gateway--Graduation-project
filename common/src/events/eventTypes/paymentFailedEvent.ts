import {Subjects} from "../Subjects";
import {ItemAttrs} from "../../models/items";


export interface PaymentFailedEvent {
    subject:Subjects.PaymentFailed;
    data:{
        payment:{
            status:string;
            cardToken:string;
            Items:[ItemAttrs];
            totalAmount:number;
            merchantId:string;
            description:string;
            cardType:string;
            clientReferenceId:string;
            clientEmail:string;
            isLive:boolean;
            checkoutId:string;
            currency:string;
        }
        checkoutSessionId:string;
        failingReason:string;
    }
}