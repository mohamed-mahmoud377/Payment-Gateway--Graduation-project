import { LoginSessions, User } from './../Models/types';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public sessions: LoginSessions[] = [];
  public twoFactorLoading = false;
  public logoutSessionLoading = false;
  public loading = false;
  public user: User | null = null;

  constructor(
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  enableFactorAuth() {
    this.twoFactorLoading = true;
    this.userService.enableTwoFactorAuth().subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Two factor authentication is enabled successfully',
        });
      },
      (error) => {
        this.twoFactorLoading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  getUserInfo() {
    this.loading = true;
    this.userService.getUserInfo().subscribe(
      ({ data }) => {
        this.loading = false;
        this.user = data;
        this.pushLast5(data.loginSession);
        console.log(this.sessions);
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  logoutOtherSessions() {
    this.logoutSessionLoading = true;
    this.userService.clearSessions().subscribe(
      (data) => {
        this.logoutSessionLoading = false;
        this.messageService.add({
          severity: 'success',
          detail: 'You logged out from all other sessions successfully',
        });
      },
      (error) => {
        this.logoutSessionLoading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  pushLast5(sessions: LoginSessions[]) {
    for (let i = sessions.length - 1; i > sessions.length - 5; i--) {
      if (sessions[i]) {
        this.sessions.push(sessions[i]);
      }
    }
  }

  formatTime(time: string) {
    return moment(time).fromNow();
  }
}
