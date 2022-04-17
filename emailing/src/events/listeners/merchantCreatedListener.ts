import {Listener} from  "@hashcash/common";
import {Message} from "node-nats-streaming";
import {UserCreatedEvent} from  "@hashcash/common";
import {Subjects} from  "@hashcash/common";
import {Email} from "../../emails/emails";
export class MerchantCreatedListener extends Listener<UserCreatedEvent>{
    queueGroupName: string= "emailing-srv";

    subject: UserCreatedEvent["subject"]= Subjects.userCreated;

    async onMessage(data: UserCreatedEvent["data"], msg: Message){

         await new Email(data.email,data.name).sendOtpSignup(data.otp)
        msg.ack();
    }


}