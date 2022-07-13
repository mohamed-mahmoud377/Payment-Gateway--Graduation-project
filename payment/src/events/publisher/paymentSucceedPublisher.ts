import {Publisher, Subjects} from "@hashcash/common";
import {PaymentSucceedEvent} from "@hashcash/common";

export class PaymentSucceedPublisher extends Publisher<PaymentSucceedEvent>{
    subject: PaymentSucceedEvent["subject"]= Subjects.PaymentSucceed;
}

