import {Listener, Subjects} from "@hashcash/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {PaymentSucceedEvent} from "../eventsTypes/paymentSucceedEvent";
import {CheckoutSession} from "../../models/checkoutSession";
import {CheckoutStatus} from "../../types/chckoutStatus";


export class PaymentSucceededListener extends Listener<PaymentSucceedEvent>{
    queueGroupName: string= queueGroupName;
    subject: PaymentSucceedEvent["subject"]=Subjects.PaymentSucceed;

    async onMessage(data: PaymentSucceedEvent["data"], msg: Message) {
        const checkout = await CheckoutSession.findById(data.checkoutSessionId);
        if (!checkout){
            console.log("something really wrong happened checkout does not exists");
            return;
        }
        checkout.status= CheckoutStatus.PAID_SUCCEEDED;
        checkout.save();
        msg.ack();


    }

}