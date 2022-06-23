import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HandelErrorService } from './shared/handle-errors.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  // refresh access token if success then update localStorage else logout
  refreshToken() {
    this.refreshTokenRequest().subscribe(
      ({ data }) => {
        localStorage.setItem('token', data.accessToken);
      },
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        this.router.navigate(['/signin']);
      }
    );
  }

  refreshTokenRequest(): Observable<any> {
    let refreshToken = localStorage.getItem('refreshToken');
    return this.httpClient.post<any>(
      `${environment.Url}/api/users/refresh-access`,
      { refreshToken }
    );
  }
}
