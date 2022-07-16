import { MessageService } from 'primeng/api';
import { HandelErrorService } from './../../../Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { AllCustomersInputs } from './../../../Models/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [MessageService],
})
export class CustomersComponent implements OnInit {
  public inputs = {
    isLive: localStorage.getItem('mode') === 'live' ? true : false,
    page: 1,
    limit: 25,
  };

  constructor(
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers(this.inputs);
  }

  getAllCustomers(inputs: AllCustomersInputs) {
    this.userService.getCustomers(inputs).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
