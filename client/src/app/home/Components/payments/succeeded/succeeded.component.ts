import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Payments, AllPaymentsInputs } from 'src/app/Models/types';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-succeeded',
  templateUrl: './succeeded.component.html',
  styleUrls: ['./succeeded.component.css'],
})
export class SucceededComponent implements OnInit {
  public inputs = {
    page: 1,
    limit: 25,
    isLive: localStorage.getItem('mode') === 'live' ? true : false,
  };
  public totalRecords!: number;
  public loading = true;

  public currentPaginationSettings!: any;
  public statuses = [
    { label: 'Incomplete', value: 'incomplete' },
    { label: 'Succeeded', value: 'succeeded' },
  ];

  public payments: Payments[] = [];

  constructor(
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.mode.subscribe((mode) => {
      this.inputs.isLive = mode === 'live' ? true : false;
      this.loadMorePayments(this.inputs);
    });
  }

  getAllPayments(inputs: AllPaymentsInputs) {
    this.loading = true;
    this.userService.getSucceededPayments(inputs).subscribe(
      ({ data }) => {
        this.loading = false;
        this.payments = data.payments;
        this.totalRecords = data.paymentsNumber;
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  loadMorePayments(event: any) {
    let currentPage;
    if (event) {
      this.currentPaginationSettings = event;
      currentPage = event.first / event.rows + 1;
    }
    this.getAllPayments({
      ...this.inputs,
      page: currentPage || this.inputs.page,
      limit: event.rows || this.inputs.limit,
    });
  }
}
