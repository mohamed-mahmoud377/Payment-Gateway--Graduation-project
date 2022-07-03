import {Listener, Subjects} from "@hashcash/common";
import {CheckoutSessionCreatedEvent} from "../eventsTypes/checkoutSessionCreated";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {Payment} from "../../models/payment";
import {PaymentStatus} from "../../types/paymentStatus";
export class CheckoutCreatedListener extends Listener<CheckoutSessionCreatedEvent>{
    queueGroupName = queueGroupName

    subject: CheckoutSessionCreatedEvent["subject"]=Subjects.CheckoutSessionCreated;


    async onMessage(data: CheckoutSessionCreatedEvent["data"], msg: Message) {
        // console.log(data)

        const payment = await  Payment.create({
            status:PaymentStatus.INCOMPLETE,
            Items:data.items,
            merchantId:data.merchantId,
            clientReferenceId:data.clientReferenceId,
            clientEmail:data.customer.email,
            isLive:data.liveMode,
            totalAmount:data.amountTotal

        })
        console.log("new payment created in incomplete status");
        msg.ack();


    }

}