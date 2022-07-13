import {Subjects} from "@hashcash/common";



export interface PaymentSucceedEvent {
    subject:Subjects.PaymentSucceed;
    data:{
        payment:{
            status:string;
            cardToken:string;
            Items:[{     name:string;
                amount:number;
                description?:string;
                quantity:number;
                image?:string;
            }];
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

    }
}