import {Listener} from "./listener";
import {Message} from "node-nats-streaming";
import {MerchantCreatedEvent} from "../eventTypes/merchantCreatedEvent";
import {Subjects} from "../Subjects";
import {Email} from "../../emails/emails";
export class MerchantCreatedListener extends Listener<MerchantCreatedEvent>{

    queueGroupName: string= "emailing-srv";
    subject: MerchantCreatedEvent["subject"]= Subjects.merchantCreated;


    async onMessage(data: MerchantCreatedEvent["data"], msg: Message){

         await new Email(data.email,data.name).sendOtpSignup(data.otp)
        msg.ack();
    }

}