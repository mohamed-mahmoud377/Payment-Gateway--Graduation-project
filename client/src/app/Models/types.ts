export enum BusinessTypes {
  individual = 'individual',
  company = 'company',
}
export enum Industries {
  software = 'software',
  clothing = 'clothing',
  digitalProducts = 'digital products',
  food = 'food and drink',
  education = 'education',
  travel = 'travel',
  entertainment = 'entertainment',
  medical = 'medical services',
}

export interface signUpInputs {
  name: string;
  email: string;
  password: string;
}
export interface GeneralOutput {
  status: string;
  result: number;
}
export interface signUpOutput extends GeneralOutput {
  data: {
    userId: string;
  };
}

export interface checkPasswordInputs {
  password: string;
}

export interface OTPRegistrationInputs {
  userId: string;
  otp: string;
}

export interface twoFactorSignInInput extends OTPRegistrationInputs {
  rememberMe: boolean;
}
export interface OTPRegistrationOutput extends GeneralOutput {
  data: any;
}
export interface loginInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface forgotPasswordInputs {
  email: string;
}

export interface resetPasswordInputs {
  newPassword: string;
}

export interface GetModeOutput extends GeneralOutput {
  data: {
    mode: string;
  };
}

export interface currentUser {
  email: string;
  exp: number;
  iat: number;
  id: string;
  isEmailVerified: boolean;
  role: string;
  sessionId: string;
  verifiedMerchant: true;
  name: string;
}

export interface changeModeInputs {
  mode: string;
}

export interface changeModeOutput extends GeneralOutput {
  data: any;
}

export interface userInfoOutput extends GeneralOutput {
  data: User;
}

export interface User {
  email: string;
  isEmailVerified: boolean;
  loginSession: LoginSessions[];
  name: string;
  twoWayAuth: boolean;
  verifiedMerchant: boolean;
}

export interface LoginSessions {
  token: string;
  device: string;
  browser: string;
  ip: string;
  expired: boolean;
  createdAt: string;
  _id: string;
}

export interface secretKeyOutput extends GeneralOutput {
  data: {
    key: string;
  };
}

export interface activateAccountInputs {
  businessInfo: {
    address: string;
    type: string;
    industry: string;
    legalName: string;
    registrationNumber: string;
    website: string;
    productDescription: string;
  };
  businessOwner: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    nationalId: string;
  };
  bankAccount: {
    IBAN: string;
  };
}

export interface CheckoutData extends GeneralOutput {
  data: {
    checkout: Checkout;
  };
}

export interface Checkout {
  _id: string;
  clientReferenceId: string;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  paidFor: false;
  customer: Customer;
  items: Item[];
  relatedCustomerPaymentCards: any[];
  createdAt: string;
  updatedAt: string;
  hash: string;
  __v: 0;
  amountTotal: number;
  checkoutUrl: string;
  expiresAt: string;
  liveMode: boolean;
  status: string;
  merchantId: string;
}

export interface Customer {
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  name: string;
  amount: number;
  quantity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  description: string;
}

export interface payInputs {
  panNumber: string;
  month: number;
  year: number;
  cardHoldName: string;
  CVC: number;
  checkoutId: string;
}

export interface paymentOutput extends GeneralOutput {
  data: {};
}

export interface AllPaymentsInputs {
  isLive: boolean;
  page: number;
  limit: number;
}

export interface AllPaymentsOutput extends GeneralOutput {
  data: {
    paymentsNumber: number;
    payments: Payments[];
  };
}
export interface Payments {
  _id: string;
  status: string;
  description: string;
  clientEmail: string;
  createdAt: string;
  currency: string;
  totalAmount: number;
}

export interface AllCustomersInputs {
  isLive: boolean;
  page: number;
  limit: number;
  email?: string;
}

export interface AllCustomersOutput extends GeneralOutput {
  data: {
    customersNumber: number;
    customers: Customers[];
  };
}

export interface Customers {
  address: string;
  clientReferenceId: string;
  createdAt: string;
  email: string;
  isLive: false;
  merchantId: string;
  name: string;
  payments: Payments[];
  phoneNumber: string;
  updatedAt: string;
}
