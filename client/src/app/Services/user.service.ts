import {
  activateAccountInputs,
  CheckoutData,
  payInputs,
  secretKeyOutput,
  userInfoOutput,
} from './../Models/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  changeModeInputs,
  changeModeOutput,
  GetModeOutput,
} from '../Models/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<any>(
      `${environment.Url}/api/users/current-user`,
      { headers }
    );
  }

  getMode(): Observable<GetModeOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.httpClient.get<GetModeOutput>(
      `${environment.Url}/api/apikey/mode`,
      { headers }
    );
  }

  changeMode(inputs: changeModeInputs): Observable<changeModeOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.httpClient.post<changeModeOutput>(
      `${environment.Url}/api/apikey/mode`,
      inputs,
      { headers }
    );
  }

  enableTwoFactorAuth(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.patch<any>(
      `${environment.Url}/api/users/enable-factor-auth`,
      '',
      { headers }
    );
  }
  getUserInfo(): Observable<userInfoOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<userInfoOutput>(
      `${environment.Url}/api/users/me`,
      {
        headers,
      }
    );
  }

  clearSessions(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.delete<any>(
      `${environment.Url}/api/users/clear-sessions`,
      {
        headers,
      }
    );
  }

  getSecretKey(mode: string): Observable<secretKeyOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<secretKeyOutput>(
      `${environment.Url}/api/apikey/key?mode=${mode}`,
      {
        headers,
      }
    );
  }

  activateAccount(inputs: activateAccountInputs): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.post<secretKeyOutput>(
      `${environment.Url}/api/manage-business/submit-activation-request`,
      inputs,
      {
        headers,
      }
    );
  }

  getActivationStatus(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<secretKeyOutput>(
      `${environment.Url}/api/manage-business/activation-request`,
      {
        headers,
      }
    );
  }
  getCheckoutData(hash: string): Observable<CheckoutData> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<CheckoutData>(
      `${environment.Url}/api/checkout/init/${hash}`,
      {
        headers,
      }
    );
  }

  pay(inputs: payInputs): Observable<any> {
    return this.httpClient.post<CheckoutData>(
      `${environment.Url}/api/checkout/pay/`,
      inputs
    );
  }
}
