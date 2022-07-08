import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  selectedPayment = 'new';
  private hash!: string;
  public error!: null | string;
  public loading = false;
  public checkoutData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      this.hash = param.hash;
      this.getPaymentSummary();
    });
  }

  getPaymentSummary() {
    this.loading = true;
    this.userService.getCheckoutSession(this.hash).subscribe(
      ({ data }) => {
        this.loading = false;
        this.checkoutData = data.checkout;
        console.log(this.checkoutData);
      },
      (error) => {
        this.loading = false;
        this.error = error.errors[0];
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
