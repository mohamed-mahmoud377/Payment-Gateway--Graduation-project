import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  public status: null | string = null;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {
    this.getActivationStatus();
  }

  getActivationStatus() {
    this.userService.getActivationStatus().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error.errorCode == 404) {
          this.status = null;
        } else {
          this.errorService.handleErrors(error, this.messageService);
        }
      }
    );
  }

  changeStatusHandler(event: any) {
    if (event) {
      this.status = event;
      console.log(this.status);
    }
  }
}
