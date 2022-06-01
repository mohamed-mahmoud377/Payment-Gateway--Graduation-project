import {Listener, MerchantActivationEvent, Subjects} from "@hashcash/common";
import {queueGroupName} from "../../types/queueGroupName";
import {Message} from "node-nats-streaming";
import {Email} from "../../emails/emails";
;

export class MerchantActivationListener extends Listener<MerchantActivationEvent>{

    queueGroupName: string= queueGroupName;
    subject :MerchantActivationEvent["subject"]=Subjects.MerchantActivation;

    async onMessage(data: MerchantActivationEvent["data"], msg: Message) {

        if (data.activated){
            await new Email(data.userEmail,'none').sendApprovedApplicationMsg();
        }else{
            // console.log(data.reason)
            await new Email(data.userEmail,'none').sendDeclinedApplicationMsg(data.reason!);
        }


        msg.ack();

    }

}