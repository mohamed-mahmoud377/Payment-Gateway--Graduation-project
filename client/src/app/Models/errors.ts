export interface APIError {
  errorCode: number;
  errors: string[];
  status: string;
}

export enum ErrorCodes {
  badRequest = 100,
  invalidEmail = 101,
  invalidUserName = 102,
  unauthorized = 151,
  expiredToken = 152,
  invalidToken = 153,
  notFound = 404,
  internalServerError = 500,
}
