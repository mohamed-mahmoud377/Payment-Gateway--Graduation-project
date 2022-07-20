import { CustomersService } from './../../../Services/customer/customers.service';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from './../../../Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { AllPaymentsInputs } from './../../../Models/types';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Services/customer/customers.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [MessageService],
})
export class CustomersComponent implements OnInit {
  public inputs = {
    page: 1,
    limit: 25,
    isLive: localStorage.getItem('mode') === 'live' ? true : false,
  };
  public totalRecords!: number;
  public loading = true;
  public filterEmailInp!: string;
  public filterLoading = false;
  public clearLoading = false;

  public currentPaginationSettings!: any;
  public statuses = [
    { label: 'Incomplete', value: 'incomplete' },
    { label: 'Succeeded', value: 'succeeded' },
  ];

  public customers: Customer[] = [];

  constructor(
    private customerService: CustomersService,
    private errorService: HandelErrorService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.mode.subscribe((mode) => {
      this.inputs.isLive = mode === 'live' ? true : false;
      this.getAllCustomers(this.inputs);
    });
  }

  getAllCustomers(inputs: AllPaymentsInputs) {
    this.loading = true;
    this.customerService.getCustomers(inputs).subscribe(
      ({ data }) => {
        this.loading = false;
        this.customers = data.customers;
        this.totalRecords = data.customersNumber;
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  loadMorePayments(event: any) {
    this.currentPaginationSettings = event;
    let currentPage = event.first / event.rows + 1;
    this.getAllCustomers({
      ...this.inputs,
      page: currentPage,
      limit: event.rows || this.inputs.limit,
    });
  }

  filterEmail() {
    if (this.filterEmailInp) {
      let newInputs = { ...this.inputs, email: this.filterEmailInp };
      this.filterLoading = true;
      this.customerService.getCustomers(newInputs).subscribe(
        ({ data }) => {
          this.filterLoading = false;
          this.customers = data.customers;
          this.totalRecords = data.customersNumber;
        },
        (error) => {
          this.filterLoading = false;
          this.errorService.handleErrors(error, this.messageService);
        }
      );
    }
  }

  clearFilterEmail() {
    if (this.filterEmailInp) {
      this.clearLoading = true;
      this.customerService.getCustomers(this.inputs).subscribe(
        ({ data }) => {
          this.clearLoading = false;
          this.customers = data.customers;
          this.totalRecords = data.customersNumber;
        },
        (error) => {
          this.clearLoading = false;
          this.errorService.handleErrors(error, this.messageService);
        }
      );
    }
  }
}
