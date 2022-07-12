import {Listener, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {PaymentRequestEvent} from "../eventsTypes/paymentRequestEvent";
import validator from "validator";
import {Payment} from "../../models/payment";
import {testCreditCardPan} from "../../types/testCreditCard";
export class PaymentRequestListener extends Listener<PaymentRequestEvent>{
    queueGroupName = queueGroupName

    subject: PaymentRequestEvent["subject"]=Subjects.PaymentRequestCreated;


    async onMessage(data: PaymentRequestEvent["data"], msg: Message) {
        console.log(data);
        const {pan,month,checkoutId,cardHoldName,CVC,year}= data;
        // lets get the payment from the checkoutId
        const payment = await Payment.findOne({checkoutId:data.checkoutId});

        if (!payment){
            return;
        }
        if (!payment.isLive){
            if (pan!==testCreditCardPan){

            }


        }



        // let's check if this a real or test payment
        //create test payment with test pan number
        // create fake live payment
        //update the payment status from incomplete to success of fail
        // go to tokenization service and tokenize payment info
        // save the new payment updates
        // publish event with payment created



        msg.ack();


    }

}