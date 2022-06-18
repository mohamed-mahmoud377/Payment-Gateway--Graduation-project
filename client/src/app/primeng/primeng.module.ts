import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    PasswordModule,
    TooltipModule,
  ],
})
export class PrimengModule {}
