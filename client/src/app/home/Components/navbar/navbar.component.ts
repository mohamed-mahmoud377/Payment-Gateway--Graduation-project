import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService],
})
export class NavbarComponent implements OnInit {
  @Input() isTest!: boolean;
  @Input() isVerified!: boolean | undefined;
  @Input() name!: string | null;
  public testValue!: boolean | undefined;

  constructor(
    private userService: UserService,
    public messageService: MessageService,
    private errorService: HandelErrorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testValue = this.isTest;
  }

  ngOnChanges(): void {
    this.testValue = this.isTest;
  }

  handleChange(event: any) {
    if (event) {
      const status = event.checked ? 'test' : 'live';
      this.changeMode(status);
    }
  }

  changeMode(mode: string) {
    this.userService.changeMode({ mode }).subscribe(
      ({ data }) => {
        localStorage.setItem('mode', data.mode);

        this.testValue = data.mode == 'test';
        this.messageService.add({
          severity: 'success',
          summary: `You are in ${data.mode} mode now`,
        });
      },
      (error) => {
        this.testValue = this.isTest;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  signOut() {
    this.authService.signOut().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/signin']);
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
