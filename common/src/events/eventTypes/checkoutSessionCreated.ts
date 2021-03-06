import {Subjects} from "../Subjects";


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
                ID:string;
                name:string;
                amount:number;
                quantity:number;
                description?:string;
            }
        ]
    }
}