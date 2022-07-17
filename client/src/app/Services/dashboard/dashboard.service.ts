import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getBalance(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<any>(
      `${environment.Url}/api/payment/my-balance`,
      {
        headers,
      }
    );
  }

  getPaymentStats(isLive: boolean): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<any>(
      `${environment.Url}/api/Payment/today-stats/payments?isLive=${isLive}`,
      {
        headers,
      }
    );
  }
}
