import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, cookieService: CookieService) {}

  getCurrentUser(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.Url}/api/users/current-user`,
      { withCredentials: true }
    );
  }
}
