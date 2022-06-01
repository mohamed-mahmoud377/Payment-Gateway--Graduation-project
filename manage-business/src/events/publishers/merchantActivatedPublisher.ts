import {MerchantActivationEvent, Publisher, Subjects} from "@hashcash/common";

export class merchantActivatedPublisher extends  Publisher<MerchantActivationEvent>{

    subject: MerchantActivationEvent["subject"]=Subjects.MerchantActivation;
}