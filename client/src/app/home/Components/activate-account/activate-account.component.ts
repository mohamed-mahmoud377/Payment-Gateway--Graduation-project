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
  public status!: string;
  public loading = false;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {
    this.getActivationStatus();
  }

  getActivationStatus() {
    this.loading = true;
    this.userService.getActivationStatus().subscribe(
      ({ data }) => {
        this.loading = false;
        this.status = data.status;
      },
      (error) => {
        this.loading = false;
        if (error.errorCode == 404) {
          return;
        } else {
          this.errorService.handleErrors(error, this.messageService);
        }
      }
    );
  }

  changeStatusHandler(event: any) {
    if (event) {
      this.status = event;
    }
  }
}
