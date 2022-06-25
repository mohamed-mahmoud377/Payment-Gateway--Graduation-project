import { User } from './../Models/types';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public sessions = [];
  public twoFactorLoading = false;
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
        this.twoFactorLoading = false;
        console.log(res);
      },
      (error) => {
        this.twoFactorLoading = false;
        console.log(error);
      }
    );
  }

  getUserInfo() {
    this.loading = true;
    this.userService.getUserInfo().subscribe(
      ({ data }) => {
        this.loading = false;
        this.user = data;
        console.log(data);
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
