import {businessInfoAttrs} from "../models/businessInfo";
import validator from "validator";
import {businessOwnerAttrs} from "../models/businessOwner";
import * as Validator from "validator";
import trim = validator.trim;
import {bankAccountAttrs} from "../models/bankAccount";

export  const  validateBusinessInfo = (businessInfo:businessInfoAttrs)=>{
    const errors:string[]= []
    if (businessInfo.address===undefined)
        errors.push("address|Business address must be provided")
    if (businessInfo.type===undefined)
        errors.push("type|Business type must be provided")
    if (businessInfo.industry===undefined)
        errors.push("industry|Business industry must be provided")
    if (businessInfo.legalName===undefined)
        errors.push("legalName|Legal name must be provided")
    else if(!validator.isAlpha(businessInfo.legalName, undefined,{ignore:' _'}))
             errors.push("legalName|Legal name must be only letters")
    if (businessInfo.registrationNumber===undefined)
        errors.push("registrationNumber|Registration number must be provided")
    else if (!validator.isNumeric(businessInfo.registrationNumber))
        errors.push("registrationNumber|Registration number only contains numbers")
    if (businessInfo.website===undefined)
        errors.push("website|Website must be provided");
    else if(!validator.isURL(businessInfo.website))
        errors.push("website|Website is not valid")
    if (businessInfo.productDescription===undefined)
        errors.push("productDescription|Product description must be provided")


    return errors;
}

export const  validateBusinessOwner = (businessOwner:businessOwnerAttrs)=>{
    const errors:string[]= [];
    if (businessOwner.firstName===undefined)
        errors.push("firstName|First name must me provided");
    else if (!validator.isAlpha(trim(businessOwner.firstName)))
        errors.push("firstName|First name must contain only letters");
    if (businessOwner.lastName===undefined)
        errors.push("lastName|Last name must me provided");
    else if (!validator.isAlpha(trim(businessOwner.lastName)))
        errors.push("lastName|Last name must contain only letters");
    if (businessOwner.email===undefined)
        errors.push("email|Email must be provided");
    else if(!validator.isEmail(String(businessOwner.email)))
        errors.push("email|Email is not valid");
    if (businessOwner.phoneNumber===undefined)
        errors.push("phoneNumber|Phone number must be provided")
    else if (!validator.isNumeric(String(businessOwner.phoneNumber)))
        errors.push("phoneNumber|Phone number only contains numbers")
    if (businessOwner.nationalId===undefined)
        errors.push("nationalId|National ID must be provided")

    return errors;
}

export const validateBankAccount =(bankAccount :bankAccountAttrs)=>{
    const errors:string[]= [];
    if (bankAccount.IBAN===undefined)
        errors.push("IBAN|IBAN must be provided")
    else if (!validator.isIBAN(String(bankAccount.IBAN)))
        errors.push("IBAN|IBAN is not valid")

    return errors;

}