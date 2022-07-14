import {Publisher, Subjects} from "@hashcash/common";
import {APIKeyVerifiedEvent} from "@hashcash/common";

export class APIKeyVerifiedPublisher extends Publisher<APIKeyVerifiedEvent>{
    subject: APIKeyVerifiedEvent["subject"]=Subjects.APIKeyVerified;

}