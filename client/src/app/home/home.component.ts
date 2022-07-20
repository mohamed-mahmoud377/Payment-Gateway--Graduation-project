import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { MessageService } from 'primeng/api';
import { currentUser } from '../Models/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  public currentUser!: currentUser;
  public loading = false;
  public isTest = true;
  constructor(
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe(
      ({ data }) => {
        this.loading = false;
        this.currentUser = data.currentUser;
        this.userService.name.next(data.currentUser.name);
        localStorage.setItem('name', this.currentUser.name);

        // check if the email is verified
        this.isEmailVerified();

        if (data.currentUser.verifiedMerchant) {
          this.getMode();
        } else {
          localStorage.setItem('mode', 'test');
        }
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  getMode() {
    this.userService.getMode().subscribe(
      ({ data }) => {
        localStorage.setItem('mode', data.mode);

        if (data.mode == 'test') {
          this.isTest = true;
        } else {
          this.isTest = false;
        }
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  isEmailVerified() {
    if (!this.currentUser.isEmailVerified) {
      this.router.navigate([`/verify-email/${this.currentUser.id}`]);
    }
  }
}
