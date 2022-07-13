import {Subjects} from "../Subjects";


export interface PaymentRequestEvent {
    subject:Subjects.PaymentRequestCreated;
    data:{
        pan:string;
        month:number;
        year:number;
        CVC:number;
        checkoutId:string;
        totalAmount:number;
        cardHoldName:string
    }
}