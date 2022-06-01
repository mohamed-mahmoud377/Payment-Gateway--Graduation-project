import {Listener, MerchantActivationEvent, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {User} from "../../models/user";

export class MerchantActivationListener extends Listener<MerchantActivationEvent>{

    queueGroupName: string= queueGroupName;
    subject :MerchantActivationEvent["subject"]=Subjects.MerchantActivation;

   async onMessage(data: MerchantActivationEvent["data"], msg: Message) {

        const existingUser = await User.findById(data.userId);
        if (!existingUser){
            console.log("something went wrong User should exist");
           return;   // we did not ack the msg so MQ will try to reach again hoping the problem is solved
        }
        existingUser.verifiedMerchant = data.activated;
        existingUser.activationRequestId = data.activationRequestId;
        existingUser.save();
       console.log("user got updated");
       msg.ack();

    }

}