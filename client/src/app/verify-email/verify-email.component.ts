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
  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params.userId;
    });
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }

  codeCompletedHandler(event: any) {
    this.disabled = false;
    this.OTP = event;
  }

  verifyEmail() {
    let inputs = {
      userId: this.userId,
      otp: this.OTP,
    };
    this.authService.OTPRegistration(inputs as any).subscribe(
      ({ data }) => {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('accessToken');
        }
        this.router.navigate(['/signin'], {
          queryParams: {
            isVerified: 'true',
          },
          queryParamsHandling: 'merge',
        });
      },
      ({ error }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.errors[0],
        });
      }
    );
  }

  resendOtp() {
    this.authService.resendOTP(this.userId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'OTP sent successfully',
          detail: 'OTP has been sent successfully to your email!',
        });
      },
      ({ error }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.errors[0],
        });
      }
    );
  }
  goBackToSignUp() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
