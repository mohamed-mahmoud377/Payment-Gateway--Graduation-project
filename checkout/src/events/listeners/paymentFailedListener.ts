import {Listener, Subjects} from "@hashcash/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {PaymentFailedEvent} from "../eventsTypes/paymentFailedEvent";
import {CheckoutSession} from "../../models/checkoutSession";
import {CheckoutStatus} from "../../types/chckoutStatus";


export class PaymentFailedListener extends Listener<PaymentFailedEvent>{
    queueGroupName: string= queueGroupName;
    subject: PaymentFailedEvent["subject"]=Subjects.PaymentFailed;

    async onMessage(data: PaymentFailedEvent["data"], msg: Message) {
        const checkout = await CheckoutSession.findById(data.checkoutSessionId);
        if (!checkout){
            console.log("something really wrong happened checkout does not exists");
            return;
        }
        checkout.status= CheckoutStatus.PAID_FAILED;
        checkout.failingReason = data.failingReason;
        checkout.save();
        msg.ack();



    }



}