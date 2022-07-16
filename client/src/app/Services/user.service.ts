import {
  activateAccountInputs,
  AllCustomersInputs,
  AllCustomersOutput,
  AllPaymentsInputs,
  AllPaymentsOutput,
  CheckoutData,
  payInputs,
  paymentOutput,
  secretKeyOutput,
  userInfoOutput,
} from './../Models/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  public mode = new BehaviorSubject<string | null>(
    localStorage.getItem('mode')
  );
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

  pay(inputs: payInputs): Observable<paymentOutput> {
    return this.httpClient.post<paymentOutput>(
      `${environment.Url}/api/checkout/pay/`,
      inputs
    );
  }

  validatePayment(checkoutId: string): Observable<paymentOutput> {
    return this.httpClient.post<paymentOutput>(
      `${environment.Url}/api/checkout/validate`,
      { checkoutId }
    );
  }

  getPayments(inputs: AllPaymentsInputs): Observable<AllPaymentsOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<AllPaymentsOutput>(
      `${environment.Url}/api/payment/payments/?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&select=totalAmount,currency,status,description,clientEmail,createdAt&sort=-createdAt`,
      {
        headers,
      }
    );
  }
  getSucceededPayments(
    inputs: AllPaymentsInputs
  ): Observable<AllPaymentsOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<AllPaymentsOutput>(
      `${environment.Url}/api/payment/payments/?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&select=totalAmount,currency,status,description,clientEmail,createdAt&sort=-createdAt&status=succeeded`,
      {
        headers,
      }
    );
  }
  getIncompletePayments(
    inputs: AllPaymentsInputs
  ): Observable<AllPaymentsOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<AllPaymentsOutput>(
      `${environment.Url}/api/payment/payments/?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&select=totalAmount,currency,status,description,clientEmail,createdAt&sort=-createdAt&status=incomplete`,
      {
        headers,
      }
    );
  }

  getFailedPayments(inputs: AllPaymentsInputs): Observable<AllPaymentsOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<AllPaymentsOutput>(
      `${environment.Url}/api/payment/payments/?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&select=totalAmount,currency,status,description,clientEmail,createdAt&sort=-createdAt&status=failed`,
      {
        headers,
      }
    );
  }

  getPayment(_id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<any>(
      `${environment.Url}/api/payment/payments/${_id}`,
      {
        headers,
      }
    );
  }

  getCustomers(inputs: AllCustomersInputs): Observable<AllCustomersOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    if (inputs.email) {
      return this.httpClient.get<AllCustomersOutput>(
        `${environment.Url}/api/customer/customers?isLive=${inputs.isLive}&email=${inputs.email}&page=${inputs.page}&limit=${inputs.limit}&sort=-createdAt/`,
        {
          headers,
        }
      );
    }
    return this.httpClient.get<AllCustomersOutput>(
      `${environment.Url}/api/customer/customers?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&sort=-createdAt/`,
      {
        headers,
      }
    );
  }
}
