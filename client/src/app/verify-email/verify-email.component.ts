import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers: [MessageService],
})
export class VerifyEmailComponent implements OnInit {
  public disabled = true;
  public OTP!: string;
  private userId = localStorage.getItem('userId');
  public isLoggedIn = false;
  public rememberMe: boolean | null = null;
  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params.userId;
    });

    this.route.queryParams.subscribe((params: any) => {
      params.rememberMe
        ? (this.rememberMe = params.rememberMe)
        : (this.rememberMe = null);
    });
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }

  codeCompletedHandler(event: any) {
    this.disabled = false;
    this.OTP = event;
  }

  submit() {
    if (this.rememberMe !== null) {
      this.otpRegistration();
    } else {
      this.verifyEmail();
    }
  }

  otpRegistration() {
    let inputs = {
      userId: this.userId,
      otp: +this.OTP,
      rememberMe: this.rememberMe,
    };

    this.authService.twoFactorSignIn(inputs as any).subscribe(
      ({ data }) => {
        this.authService.setToken(data.accessToken);
        this.authService.setRefreshToken(data.refreshToken);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  verifyEmail() {
    let inputs = {
      userId: this.userId,
      otp: this.OTP,
    };
    this.authService.OTPRegistration(inputs as any).subscribe(
      ({ data }) => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          this.router.navigate(['/']);
        }
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('name');
        }
        this.router.navigate(['/signin'], {
          queryParams: {
            isVerified: 'true',
          },
          queryParamsHandling: 'merge',
        });
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  resendOtp() {
    let isSignUp = true;
    if (this.rememberMe !== null) {
      isSignUp = false;
    }
    this.authService.resendOTP(this.userId, isSignUp).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'OTP sent successfully',
          detail: 'OTP has been sent successfully to your email!',
        });
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
  goBackToSignUp() {
    if (localStorage.getItem('token')) {
      this.authService.removeTokens();
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
