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
  public testBalance!: number;
  public liveBalance!: number;
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
    this.getBalance();
  }

  getBalance() {
    this.dashboardService.getBalance().subscribe(
      ({ data }) => {
        if (data == []) {
          this.testBalance = 0;
          return;
        }
        for (let entry of data) {
          if (entry._id == false) {
            this.testBalance = entry?.balance;
          } else {
            this.liveBalance = entry?.balance;
          }
        }
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  getPaymentsStats(isLive: boolean) {
    this.loading = true;
    this.dashboardService.getPaymentStats(isLive).subscribe(
      ({ data }) => {
        this.loading = false;
        this.balance = data[0]?.balance | 0;
        this.paymentsNumber = data[0]?.PaymentsNumber | 0;
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
