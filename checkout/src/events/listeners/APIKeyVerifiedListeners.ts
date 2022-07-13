import {Listener, Subjects} from "@hashcash/common";
import {APIKeyVerifiedEvent} from "@hashcash/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {CheckoutSession} from "../../models/checkoutSession";
import {CheckoutStatus} from "../../types/chckoutStatus";
import {CheckoutSessionCreatedPublisher} from "../publishers/checkoutSessionCreatedPublisher";
import {natsWrapper} from "../../nats/nats-wrapper";

export class APIKeyVerifiedListeners extends Listener<APIKeyVerifiedEvent>{
    queueGroupName: string= queueGroupName;
    subject: APIKeyVerifiedEvent["subject"]=Subjects.APIKeyVerified;

    async onMessage(data: APIKeyVerifiedEvent["data"], msg: Message) {
        const {isValid,merchantId,checkoutSessionId} =data;

        const checkout = await CheckoutSession.findById(checkoutSessionId);

        if (!checkout){
            console.log('Something seriously went wrong here checkoutSession is not found');
            return;
        }
        if (isValid){
            checkout.status= CheckoutStatus.VALID_APIKEY;
            checkout.merchantId= merchantId;

            await new CheckoutSessionCreatedPublisher(natsWrapper.client).publish({
                amountTotal: checkout.amountTotal, checkoutSessionId: checkout.id, clientReferenceId: checkout.clientReferenceId, currency: checkout.currency
                ,liveMode:checkout.liveMode,customer:{
                    email:checkout.customer.email,
                    name:checkout.customer.name,
                    phoneNumber:checkout.customer.phoneNumber,
                    address:checkout.customer.address
                },
                items:checkout.items,
                expiresAt: checkout.expiresAt,
                merchantId: checkout.merchantId


            })


        }else{
            checkout.status= CheckoutStatus.INVALID_APIKEY;
        }

        await checkout.save();

        msg.ack();


    }
    
}