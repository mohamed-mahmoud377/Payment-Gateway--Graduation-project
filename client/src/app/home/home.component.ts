import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { HandelErrorService } from '../Services/shared/handel-error.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      ({ data }) => {
        if (data.currentUser.verifiedMerchant) {
          //  call the get mode api
        } else {
          // test mode is off
        }
        console.log(data);
      },
      ({ error }) => {
        this.errorService.handleErrors(error, this.messageService);
        console.log(error);
      }
    );
  }
}
