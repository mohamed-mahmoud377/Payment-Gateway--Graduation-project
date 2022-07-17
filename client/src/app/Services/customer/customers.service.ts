import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllCustomersInputs, AllCustomersOutput } from './customers.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(inputs: AllCustomersInputs): Observable<AllCustomersOutput> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    if (inputs.email) {
      return this.httpClient.get<AllCustomersOutput>(
        `${environment.Url}/api/customer/customers?isLive=${inputs.isLive}&email=${inputs.email}&page=${inputs.page}&limit=${inputs.limit}&sort=-createdAt`,
        {
          headers,
        }
      );
    }
    return this.httpClient.get<AllCustomersOutput>(
      `${environment.Url}/api/customer/customers?isLive=${inputs.isLive}&page=${inputs.page}&limit=${inputs.limit}&sort=-createdAt`,
      {
        headers,
      }
    );
  }
  getCustomer(_id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.httpClient.get<any>(
      `${environment.Url}/api/customer/customers/${_id}`,
      {
        headers,
      }
    );
  }
}
