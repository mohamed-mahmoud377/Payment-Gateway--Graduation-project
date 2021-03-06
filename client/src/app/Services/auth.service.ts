import {
  signUpInputs,
  signUpOutput,
  checkPasswordInputs,
  OTPRegistrationInputs,
  OTPRegistrationOutput,
  loginInputs,
  forgotPasswordInputs,
  resetPasswordInputs,
  twoFactorSignInInput,
} from './../Models/types';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public userId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  signUp(inputs: signUpInputs): Observable<signUpOutput> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<signUpOutput>(
      `${environment.Url}/api/users/signup`,
      inputs,
      { headers }
    );
  }
  checkPassword(inputs: checkPasswordInputs): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/check-password`,
      inputs
    );
  }

  OTPRegistration(
    inputs: OTPRegistrationInputs
  ): Observable<OTPRegistrationOutput> {
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/verify-email`,
      inputs
    );
  }

  twoFactorSignIn(inputs: twoFactorSignInInput): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/otp-registration`,
      inputs
    );
  }

  resendOTP(
    userId: string | null,
    isSignUp: boolean
  ): Observable<OTPRegistrationOutput> {
    let forParam = isSignUp ? 'signup' : 'login';
    return this.httpClient.get<any>(
      `${environment.Url}/api/users/resend-otp/${userId}?sendFor=${forParam}`
    );
  }

  login(inputs: loginInputs): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/login`,
      inputs
    );
  }

  forgotPassword(inputs: forgotPasswordInputs) {
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/forgot-password`,
      inputs
    );
  }

  resetPassword(inputs: resetPasswordInputs, token: string) {
    return this.httpClient.patch<any>(
      `${environment.Url}/api/users/reset-password/${token}`,
      inputs
    );
  }

  signOut(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/signout`,
      '',
      {
        headers,
      }
    );
  }

  removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}
