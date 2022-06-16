import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HandelErrorService {
  constructor() {}

  handleErrors(error: any, messageService: MessageService) {
    if (error.errors) {
      messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: error.errors[0],
      });
    } else {
      messageService.add({
        severity: 'warn',
        summary: 'Service not available',
        detail: 'Please try again later',
      });
    }
  }
}
