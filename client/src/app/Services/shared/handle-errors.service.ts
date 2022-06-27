import { AuthService } from 'src/app/Services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorCodes, APIError } from '../../Models/errors';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshTokenService } from '../refresh-token.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
    if (!error) {
      return;
    }
    // if there are error messages
    if (error.errors) {
      // error related to email input
      if (error.errorCode == ErrorCodes.invalidEmail) {
        formCtr
          ? formCtr.get('email')?.setErrors({ api: error.errors[0] })
          : messageService.add({ severity: 'error', detail: error.errors[0] });
      }
      // if error related to username
      else if (error.errorCode == ErrorCodes.invalidUserName) {
        messageService.add({ severity: 'error', detail: error.errors[0] });
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

  handleActivateError(
    error: APIError,
    ctrl: FormGroup,
    messageService: MessageService
  ) {
    if (error.errors) {
      if (error.errorCode == ErrorCodes.badRequest) {
        let errors = error.errors.map((error) => {
          let message = error.split('|')[1];
          let field = error.split('|')[0];
          return { message, field };
        });

        for (let error of errors) {
          if (
            error.field == 'address' ||
            error.field == 'type' ||
            error.field == 'industry' ||
            error.field == 'legalName' ||
            error.field == 'registrationNumber' ||
            error.field == 'website' ||
            error.field == 'productDescription'
          ) {
            ctrl
              .get(`businessInfo.${error.field}`)
              ?.setErrors({ API: error.message });
          } else if (
            error.field == 'address' ||
            error.field == 'firstName' ||
            error.field == 'lastName' ||
            error.field == 'email' ||
            error.field == 'phoneNumber' ||
            error.field == 'nationalId'
          ) {
            ctrl
              .get(`businessOwner.${error.field}`)
              ?.setErrors({ API: error.message });
          } else if (error.field == 'IBAN') {
            ctrl
              .get(`bankAccount.${error.field}`)
              ?.setErrors({ API: error.message });
          }
        }
      } else {
        this.handleErrors(error, messageService);
      }
    } else {
      messageService.add({
        severity: 'warn',
        summary: 'Service not available',
        detail: 'Please try again later',
      });
    }
  }
}
