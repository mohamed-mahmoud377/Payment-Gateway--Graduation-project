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
}
