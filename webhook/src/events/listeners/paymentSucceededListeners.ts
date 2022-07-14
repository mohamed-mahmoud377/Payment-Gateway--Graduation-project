import {Listener, PaymentSucceedEvent, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import axios from "axios";
import {WebHook} from "../../models/webHook";



export class PaymentSucceededListeners extends Listener<PaymentSucceedEvent>{
    queueGroupName = queueGroupName

    subject: PaymentSucceedEvent["subject"]=Subjects.PaymentSucceed;


    async onMessage(data: PaymentSucceedEvent["data"], msg: Message) {
        const webhook  = await WebHook.findOne({merchantId:data.payment.merchantId})

        if (!webhook){
            console.log("web hook does not exist for that user");
            return msg.ack();
        }



        try{
            const response = await axios.post(webhook.url,{
                ...data,
                secretKey:webhook.secretKey
            },{
                timeout:30000
            });
            console.log('webhook sent successfully');

            msg.ack();
        }catch (err :any){
            console.log("sending web hook failed");
            console.log(err.message);
            msg.ack();
        }



    }

}