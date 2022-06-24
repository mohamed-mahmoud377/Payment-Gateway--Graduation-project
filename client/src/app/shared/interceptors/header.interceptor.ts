import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ErrorCodes } from 'src/app/Models/errors';
import { RefreshTokenService } from './../../Services/refresh-token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const retryCount = 3;

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error }) => {
        if (error.errorCode === ErrorCodes.expiredToken) {
          return this.refreshTokenService.refreshTokenRequest().pipe(
            switchMap(({ data }) => {
              this.authService.setToken(data.accessToken);
              let token = this.authService.getToken();
              request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
              });
              return next.handle(request);
            }),
            catchError((error) => {
              this.authService.removeTokens();
              this.router.navigate(['/signin']);
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
