import {Listener, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {PaymentRequestEvent} from "@hashcash/common";
import axios from 'axios';
import {Payment} from "../../models/payment";
import {testCreditCardPan} from "../../types/testCreditCard";
import {PaymentStatus} from "../../types/paymentStatus";
import {PaymentSucceedPublisher} from "../publisher/paymentSucceedPublisher";
import {natsWrapper} from "../../nats/nats-wrapper";
import {PaymentFailedPublisher} from "../publisher/paymentFailedPublisher";


//this is a creation of a fake payment even in live mode, this is just a simulation, there is no any payment processor
// or acquiring  bank involved
export class PaymentRequestListener extends Listener<PaymentRequestEvent>{
    queueGroupName = queueGroupName

    subject: PaymentRequestEvent["subject"]=Subjects.PaymentRequestCreated;


    async onMessage(data: PaymentRequestEvent["data"], msg: Message) {

        const {pan,month,checkoutId,cardHoldName,CVC,year}= data;
        let isSucceeded :boolean=true;
        let failingReason:string="something went wrong";
        // lets get the payment from the checkoutId
        const payment = await Payment.findOne({checkoutId:data.checkoutId});

        if (!payment){
            console.log("something really wrong happened payment does not exits");
            return;
        }

        if (!payment.isLive){
            if (pan!==testCreditCardPan){
                payment.status=PaymentStatus.FAILED;
                isSucceeded=false;
                failingReason= "Your card was declined. Your request was in test mode, but used a non test card";
            }else{
                payment.status=PaymentStatus.SUCCEEDED;
            }
        }

        if (payment.isLive){
            // this just a simulation
            const  randomNumber=  Math.ceil(Math.random() *10);
            if (randomNumber%3===0){
                console.log(randomNumber);
                payment.status=PaymentStatus.FAILED;
                isSucceeded=false;
                failingReason="We couldn't complete this purchase. Please try again."
            }else{
                payment.status=PaymentStatus.SUCCEEDED;
            }
        }

        // go to tokenization service and tokenize payment info

        const response = await axios.post('http://tokenization-srv:3000/api/tokenization/tokenize',{
            cardHolderData:{
                month,
                year,
                pan,
                name:cardHoldName
            },
            merchantId:payment.merchantId
        },{
            timeout: 10000,
            headers:{
                'Authorization':process.env.SERVICE_ACCESS_TOKEN!
            }
        });
       if (pan.startsWith('4'))
           payment.cardType="Visa credit card";
        if (pan.startsWith('5'))
            payment.cardType="Mastercard credit card";
        const token = response.data.data.token;
        payment.cardToken=token ;
        await payment.save();

        const paymentToSend = {
            id:payment.id,
            Items: payment.Items,
            cardToken: token,
            cardType: payment.cardType,
            checkoutId: checkoutId,
            clientEmail: payment.clientEmail,
            clientReferenceId:  payment.clientReferenceId,
            currency:  payment.currency,
            description:  payment.description,
            isLive: payment.isLive,
            merchantId:  payment.merchantId,
            status: payment.status,
            totalAmount: payment.totalAmount,
            createdAt:payment.createdAt,
        }

        if (isSucceeded){
            await new PaymentSucceedPublisher(natsWrapper.client).publish({
                checkoutSessionId: checkoutId,
                payment: paymentToSend,
            })
        }else{
            await new PaymentFailedPublisher(natsWrapper.client).publish({
                failingReason,
                checkoutSessionId: checkoutId,
                payment: paymentToSend
            })
        }
        console.log(payment);
        msg.ack();
    }

}