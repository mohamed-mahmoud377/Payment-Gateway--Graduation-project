export interface signUpInputs {
  name: string;
  email: string;
  password: string;
}
export interface generalOutput {
  status: string;
  result: number;
}
export interface signUpOutput extends generalOutput {
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
export interface OTPRegistrationOutput extends generalOutput {
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
