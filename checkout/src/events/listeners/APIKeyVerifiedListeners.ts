import {Listener, Subjects} from "@hashcash/common";
import {APIKeyVerifiedEvent} from "../eventsTypes/APIKeyVerifiedEvent";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {CheckoutSession} from "../../models/checkoutSession";
import {CheckoutStatus} from "../../types/chckoutStatus";

export class APIKeyVerifiedListeners extends Listener<APIKeyVerifiedEvent>{
    queueGroupName: string= queueGroupName;
    subject: APIKeyVerifiedEvent["subject"]=Subjects.APIKeyVerified;

    async onMessage(data: APIKeyVerifiedEvent["data"], msg: Message) {
        const {isValid,merchantId,checkoutSessionId} =data;

        const checkoutSession = await CheckoutSession.findById(checkoutSessionId);

        if (!checkoutSession){
            console.log('Something seriously went wrong here checkoutSession is not found');
            return;
        }
        if (isValid){
            checkoutSession.status= CheckoutStatus.VALID_APIKEY;
            checkoutSession.merchantId= merchantId;
        }else{
            checkoutSession.status= CheckoutStatus.INVALID_APIKEY;
        }

        await checkoutSession.save();

        msg.ack();





    }
    
}