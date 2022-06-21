import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public loading = false;
  public token!: string;
  public passwordError!: string | null;
  public verifyLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.token = params.token;
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: this.fb.control('', [Validators.required]),
    });
  }

  forgotPassword() {
    this.loading = true;
    this.authService
      .resetPassword(this.resetPasswordForm.value, this.token)
      .subscribe(
        ({ data }) => {
          this.router.navigate(['/signin']);
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

  checkPassword() {
    this.verifyLoading = true;
    this.authService
      .checkPassword({ password: this.passwordCtr.value })
      .subscribe(
        (res) => {
          this.verifyLoading = false;
          if (res.status === 'success') {
            this.passwordError = null;
          } else {
            this.passwordError = res.errors[0];
          }
        },
        ({ error }) => {
          this.verifyLoading = false;
          this.passwordError = error.errors[0];
        }
      );
  }

  get passwordCtr() {
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }
}
