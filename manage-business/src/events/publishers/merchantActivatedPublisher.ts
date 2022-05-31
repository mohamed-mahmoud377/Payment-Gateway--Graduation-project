import {MerchantActivatedEvent, Publisher, Subjects} from "@hashcash/common";

export class merchantActivatedPublisher extends  Publisher<MerchantActivatedEvent>{

    subject: MerchantActivatedEvent["subject"]=Subjects.MerchantActivated;
}