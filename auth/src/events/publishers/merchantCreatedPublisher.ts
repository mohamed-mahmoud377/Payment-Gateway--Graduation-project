import {Publisher} from "./publisher";
import {Subjects} from "../Subjects";
import {MerchantCreatedEvent} from "../eventTypes/merchantCreatedEvent";

export class MerchantCreatedPublisher extends Publisher<MerchantCreatedEvent>{
    subject: MerchantCreatedEvent["subject"]=Subjects.merchantCreated;

}