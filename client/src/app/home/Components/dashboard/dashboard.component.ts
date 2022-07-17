import { UserService } from 'src/app/Services/user.service';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { DashboardService } from './../../../Services/dashboard/dashboard.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  public isLive = false;
  public balance!: number;
  public paymentsNumber!: number;
  public loading = false;
  public name = localStorage.getItem('name');
  constructor(
    private dashboardService: DashboardService,
    private errorService: HandelErrorService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.mode.subscribe((mode) => {
      this.isLive = mode == 'live';
      this.getPaymentsStats(this.isLive);
    });
  }

  getPaymentsStats(isLive: boolean) {
    this.loading = true;
    this.dashboardService.getPaymentStats(isLive).subscribe(
      ({ data }) => {
        this.loading = false;
        this.balance = data[0].balance;
        this.paymentsNumber = data[0].PaymentsNumber;
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
