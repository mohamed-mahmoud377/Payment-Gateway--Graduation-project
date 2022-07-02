import {Listener, Subjects} from "@hashcash/common";
import {VerifyAPIKeyEvent} from "../eventTypes/verifyAPIKeyEvent";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "../../types/queueGroupName";
import {Keys} from "../../models/keys";
import {APIKeyVerifiedPublisher} from "../publishers/APIKeyVerifiedPublisher";
import {natsWrapper} from "../../nats/nats-wrapper";

export class VerifyAPIKeyListener extends Listener<VerifyAPIKeyEvent>{

    queueGroupName: string=queueGroupName ;
    subject: VerifyAPIKeyEvent["subject"]=Subjects.verifyAPIKey;

    async onMessage(data: VerifyAPIKeyEvent["data"], msg: Message) {
        console.log(data)
        let isLiveMode:boolean;
        let isValid=false;
        let query:any;
        let merchantId:string="none";
        const arr = data.apikey.split('_');
        const mode = arr[1];
        mode === "Live" ? isLiveMode =true : isLiveMode = false;

        if (isLiveMode)
            query= {liveKey:data.apikey}
        else
            query= {testKey:data.apikey}



        const apiKey = await Keys.findOne(query);


        if (apiKey){
            isValid= true;
            merchantId= apiKey.userId
        }


        await new APIKeyVerifiedPublisher(natsWrapper.client).publish({
            checkoutSessionId:data.checkoutSessionId, isValid, merchantId

        })
        msg.ack();






    }

}
