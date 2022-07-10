import {Listener, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {CheckoutSessionCreatedEvent} from "../eventTypes/checkoutSessionCreated";

export class CheckoutCreatedListener extends Listener<CheckoutSessionCreatedEvent>{
    queueGroupName = queueGroupName

    subject: CheckoutSessionCreatedEvent["subject"]=Subjects.CheckoutSessionCreated;


    async onMessage(data: CheckoutSessionCreatedEvent["data"], msg: Message) {
        console.log(data)


        msg.ack();


    }

}