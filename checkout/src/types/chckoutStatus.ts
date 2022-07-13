export const enum CheckoutStatus{
    PENDING_APIKEY_AUTH="pending apikey authentication",
    VALID_APIKEY="valid APIKey",
    INVALID_APIKEY= 'invalid APIKey',
    PENDING_PAYMENT_REQUEST= "pending payment request",
    PAID_SUCCEEDED = "paid successfully",
    PAID_FAILED= 'paid failed',

}