import {Subjects} from "../Subjects";

export interface MerchantActivationEvent {
    subject:Subjects.MerchantActivation;
    data:{
        activated:boolean;
        userId:string,
        userEmail:string;
        activatedBy:string,
        activationRequestId:string;
        reason?:string;
    }
}