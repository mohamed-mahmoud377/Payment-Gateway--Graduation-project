import {Listener, PaymentSucceedEvent, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {Customer} from "../../models/customer";

export class PaymentSucceededListeners extends Listener<PaymentSucceedEvent>{
    queueGroupName = queueGroupName

    subject: PaymentSucceedEvent["subject"]=Subjects.PaymentSucceed;


    async onMessage(data: PaymentSucceedEvent["data"], msg: Message) {

        const customer = await Customer.findOne({merchantId:data.payment.merchantId,clientReferenceId:data.payment.clientReferenceId});
        if (!customer){
            console.log("something really wrong happened");
            return;
        }
        customer.payments.push({
            id:data.payment.id,
            totalAmount:data.payment.totalAmount,
            currency: data.payment.currency,
            paymentDate: data.payment.createdAt,
            description: data.payment.description,
            status:data.payment.status
        });
        await customer.save();
        console.log("payment has been added to customer successfully ");
        msg.ack();


    }

}