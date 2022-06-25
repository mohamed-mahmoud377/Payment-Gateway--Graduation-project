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
}

export interface changeModeInputs {
  mode: string;
}

export interface changeModeOutput extends GeneralOutput {
  data: any;
}
