import {Listener, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {CheckoutSessionCreatedEvent} from "@hashcash/common";
import {Customer} from "../../models/customer";

export class CheckoutCreatedListener extends Listener<CheckoutSessionCreatedEvent>{
    queueGroupName = queueGroupName

    subject: CheckoutSessionCreatedEvent["subject"]=Subjects.CheckoutSessionCreated;


    async onMessage(data: CheckoutSessionCreatedEvent["data"], msg: Message) {
        // console.log(data);
        const customer = await Customer.findOne({
            merchantId:data.merchantId,
            clientReferenceId:data.clientReferenceId
        })
        if (customer){
            console.log("customer already exists");
            return msg.ack();
        }
        const newCustomer = await Customer.create({
            email:data.customer.email,
            name:data.customer.name,
            phoneNumber: data.customer.phoneNumber,
            address:data.customer.address,
            clientReferenceId:data.clientReferenceId,
            merchantId:data.merchantId,
            isLive:data.liveMode

        })
        console.log("New customer created !")
        msg.ack();

    }

}