import { WebhookOutput } from './webhook.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllCustomersOutput } from '../customer/customers.model';

@Injectable({
  providedIn: 'root',
})
export class WebhookService {
  constructor(private httpClient: HttpClient) {}

  createWebhook(inputs: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.post<any>(
      `${environment.Url}/api/webhook/add`,
      inputs,
      {
        headers,
      }
    );
  }
  getWebhook(): Observable<WebhookOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<WebhookOutput>(
      `${environment.Url}/api/webhook/`,
      {
        headers,
      }
    );
  }

  deleteWebhook(): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.delete<any>(`${environment.Url}/api/webhook/`, {
      headers,
    });
  }
}
