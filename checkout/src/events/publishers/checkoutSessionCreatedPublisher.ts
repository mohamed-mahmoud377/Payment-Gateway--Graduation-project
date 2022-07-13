import {Publisher, Subjects} from "@hashcash/common";
import {CheckoutSessionCreatedEvent} from "@hashcash/common";

export class CheckoutSessionCreatedPublisher extends Publisher<CheckoutSessionCreatedEvent>{
    subject: CheckoutSessionCreatedEvent["subject"]= Subjects.CheckoutSessionCreated;

}

