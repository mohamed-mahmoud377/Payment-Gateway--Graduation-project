import { CookieService } from 'ngx-cookie-service';
import { HandelErrorService } from './../Services/shared/handel-error.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  public signInCtr!: FormGroup;
  public passwordError!: string | null;
  public loading = false;
  public verifyLoading = false;
  public isEmailVerified = false;
  public verifiedMsg = [
    {
      severity: 'success',
      detail: 'Email has been verified successfully you can login now',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private handleErrorService: HandelErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.isVerified == 'true') {
        this.isEmailVerified = true;
      }
    });
    this, this.initializeSignUpForm();
  }
  checkboxChange(event: any) {
    if (event.checked[0]) {
      this.rememberMeCtr.setValue(true);
    } else {
      this.rememberMeCtr.setValue(false);
    }
  }

  initializeSignUpForm() {
    this.signInCtr = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.min(6)]),
      rememberMe: this.fb.control(false),
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.signInCtr.value).subscribe(
      ({ data }) => {
        this.loading = false;
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.loading = false;

        this.handleErrorService.handleErrors(error, this.messageService);
      }
    );
  }

  get emailCtr() {
    return this.signInCtr.get('email') as FormControl;
  }
  get passwordCtr() {
    return this.signInCtr.get('password') as FormControl;
  }
  get rememberMeCtr() {
    return this.signInCtr.get('rememberMe') as FormControl;
  }
}
