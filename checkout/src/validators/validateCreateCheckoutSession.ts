import {body} from "express-validator";
export const createCheckoutValidator =[
    body('secretKey')
        .notEmpty()
        .withMessage("secretKey field must be provided"),
    body('customer')
        .notEmpty()
        .withMessage("customer field must be provided"),
    body('customer.email')
        .notEmpty()
        .withMessage("customer.email field must be provided"),
    body('clientReferenceId')
        .notEmpty()
        .withMessage("clientReferenceId field must be provided"),
    body('items')
        .notEmpty()
        .withMessage("items field must be provided"),
    body('items.*.name')
        .notEmpty()
        .withMessage("items.name field must be provided"),
    body('items.*.amount')
        .notEmpty()
        .withMessage("items.amount field must be provided"),
    body('currency')
        .notEmpty()
        .withMessage("currency field must be provided"),
    body('successUrl')
        .notEmpty()
        .withMessage("successUrl field must be provided"),
    body('cancelUrl')
        .notEmpty()
        .withMessage("cancelUrl field must be provided"),


]