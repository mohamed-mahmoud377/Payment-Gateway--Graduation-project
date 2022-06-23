import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup } from '@angular/forms';
import { ErrorCodes, APIError } from '../../Models/errors';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshTokenService } from '../refresh-token.service';

@Injectable({
  providedIn: 'root',
})
export class HandelErrorService {
  constructor(
    private router: Router,
    private refreshTokenService: RefreshTokenService,
    private authService: AuthService
  ) {}

  handleErrors(
    error: APIError,
    messageService: MessageService,
    formCtr?: FormGroup
  ) {
    // if there are error messages
    if (error.errors) {
      // error related to email input
      if (error.errorCode == ErrorCodes.invalidEmail) {
        formCtr
          ? formCtr.get('email')?.setErrors({ api: error.errors[0] })
          : messageService.add({ severity: 'error', detail: error.errors[0] });
        console.log(formCtr?.get('email')?.errors);
      }
      // if error related to username
      else if (error.errorCode == ErrorCodes.invalidUserName) {
        messageService.add({ severity: 'error', detail: error.errors[0] });
      }
      // if error related to expired token
      else if (error.errorCode == ErrorCodes.expiredToken) {
        this.refreshTokenService.refreshToken();
      }
      // if error related to unauthorized access
      else if (error.errorCode == ErrorCodes.invalidToken) {
        this.authService.removeTokens();
        this.router.navigate(['/signin']);
      }
      // other errors
      else {
        messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.errors[0],
        });
      }
    }
    // if there are no error messages to show
    else {
      messageService.add({
        severity: 'warn',
        summary: 'Service not available',
        detail: 'Please try again later',
      });
    }
  }
}
