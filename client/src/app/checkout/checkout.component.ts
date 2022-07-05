import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  selectedPayment = 'new';
  private hash!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      console.log(param.hash);
      this.hash = param.hash;
    });
  }

  getPaymentSummary() {
    this.userService.getCheckoutSession(this.hash).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
