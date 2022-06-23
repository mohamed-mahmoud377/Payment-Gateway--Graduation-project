import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  public signUpCtr!: FormGroup;
  public passwordError!: string | null;
  public loading = false;
  public verifyLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private handleErrorService: HandelErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpCtr = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.min(6)]),
      name: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.signUp(this.signUpCtr.value).subscribe(
      ({ data }) => {
        this.loading = false;
        this.router.navigate([`/verify-email/${data.userId}`]);
      },
      ({ error }) => {
        this.loading = false;
        this.handleErrorService.handleErrors(
          error,
          this.messageService,
          this.signUpCtr
        );
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
          }
        },
        ({ error }) => {
          this.verifyLoading = false;
          this.passwordError = error.errors[0];
        }
      );
  }

  get emailCtr() {
    return this.signUpCtr.get('email') as FormControl;
  }
  get passwordCtr() {
    return this.signUpCtr.get('password') as FormControl;
  }
  get nameCtr() {
    return this.signUpCtr.get('name') as FormControl;
  }
}
