import { MessageService } from 'primeng/api';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [MessageService],
})
export class ForgetPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  forgotPassword() {
    this.loading = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      ({ data }) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Reset Password has been sent ',
          detail: 'Please check your email',
        });
      },
      ({ error }) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.errors[0],
        });
      }
    );
  }

  get emailCtr() {
    return this.forgotPasswordForm.get('email') as FormControl;
  }
}
