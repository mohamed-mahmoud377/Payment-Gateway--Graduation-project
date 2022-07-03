import {Subjects} from "@hashcash/common";


export interface CheckoutSessionCreatedEvent {
    subject:Subjects.CheckoutSessionCreated;
    data:{
        checkoutSessionId:string;
        merchantId:string;
        expiresAt:Date;
        amountTotal:Number;
        liveMode:boolean;
        clientReferenceId:string;
        currency:string;
        customer:{
            email:string;
            name?:string;
            phoneNumber?:string;
            address?:string
        },
        items:[
            {
                name:string;
                amount:number;
                quantity:number;
                description?:string;
            }
        ]
    }
}