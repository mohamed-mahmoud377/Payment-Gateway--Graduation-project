import {Publisher, Subjects} from "@hashcash/common";
import {APIKeyVerifiedEvent} from "../eventTypes/APIKeyVerifiedEvent";

export class APIKeyVerifiedPublisher extends Publisher<APIKeyVerifiedEvent>{
    subject: APIKeyVerifiedEvent["subject"]=Subjects.APIKeyVerified;

}