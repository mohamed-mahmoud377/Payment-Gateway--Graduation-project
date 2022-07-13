import {Publisher, Subjects} from "@hashcash/common";
import {CheckoutSessionCreatedEvent} from "../eventsTypes/checkoutSessionCreated";

export class CheckoutSessionCreatedPublisher extends Publisher<CheckoutSessionCreatedEvent>{
    subject: CheckoutSessionCreatedEvent["subject"]= Subjects.CheckoutSessionCreated;

}

