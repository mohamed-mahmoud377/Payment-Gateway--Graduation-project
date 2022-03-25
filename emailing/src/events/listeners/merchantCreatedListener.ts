import {Listener} from "./listener";
import {Message} from "node-nats-streaming";
import {UserCreatedEvent} from "../eventTypes/userCreatedEvent";
import {Subjects} from "../Subjects";
import {Email} from "../../emails/emails";
export class MerchantCreatedListener extends Listener<UserCreatedEvent>{
    queueGroupName: string= "emailing-srv";

    subject: UserCreatedEvent["subject"]= Subjects.userCreated;

    async onMessage(data: UserCreatedEvent["data"], msg: Message){

         await new Email(data.email,data.name).sendOtpSignup(data.otp)
        msg.ack();
    }


}