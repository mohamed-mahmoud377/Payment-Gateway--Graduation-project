import {Listener, MerchantActivationEvent, Modes, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";

import {Keys} from "../../models/keys";
import {generateKey} from "../../utils/generateKey";



export class MerchantActivationListener extends Listener<MerchantActivationEvent>{

    queueGroupName: string= queueGroupName;
    subject :MerchantActivationEvent["subject"]=Subjects.MerchantActivation;

   async onMessage(data: MerchantActivationEvent["data"], msg: Message) {
       // if the activation request is declined just do not do anything ack the function and return
        if (!data.activated){
            msg.ack();
            return;
        }
        const keys =await  Keys.findOne({userId:data.userId});
        if (!keys){
            throw new Error("some thing went wrong");
        }
        keys!.verifiedMerchant = true;
        keys!.liveKey = generateKey(Modes.LIVE);
        keys!.liveCreatedAt = new Date(Date.now());
        await keys.save();


       msg.ack();

    }

}