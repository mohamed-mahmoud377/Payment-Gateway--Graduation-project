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
    private refreshTokenService: RefreshTokenService
  ) {}

  handleErrors(error: any, messageService: MessageService) {
    if (error.errors) {
      if (error.errorCode === 152) {
        this.refreshTokenService.refreshToken();
      } else if (error.errorCode == 135) {
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        this.router.navigate(['/signin']);
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.errors[0],
        });
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

// messageService.add({
//   severity: 'error',
//   summary: 'Error!',
//   detail: error.errors[0],
// });
