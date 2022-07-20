import { CustomersService } from './../../../../Services/customer/customers.service';
import { Customer } from './../../../../Services/customer/customers.model';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.css'],
})
export class SingleCustomerComponent implements OnInit {
  public customer!: Customer;
  public loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandle: HandelErrorService,
    private customerService: CustomersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getCustomer(params.id);
    });
  }

  getCustomer(id: string) {
    this.loading = true;
    this.customerService.getCustomer(id).subscribe(
      ({ data }) => {
        this.loading = false;
        this.customer = data.customer;
      },
      (error) => {
        this.loading = false;
        this.errorHandle.handleErrors(error, this.messageService);
      }
    );
  }
}
