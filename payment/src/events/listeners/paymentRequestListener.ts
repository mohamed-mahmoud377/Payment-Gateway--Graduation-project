import {Listener, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {PaymentRequestEvent} from "../eventsTypes/paymentRequestEvent";
export class PaymentRequestListener extends Listener<PaymentRequestEvent>{
    queueGroupName = queueGroupName

    subject: PaymentRequestEvent["subject"]=Subjects.PaymentRequestCreated;


    async onMessage(data: PaymentRequestEvent["data"], msg: Message) {
        console.log(data)


        msg.ack();


    }

}