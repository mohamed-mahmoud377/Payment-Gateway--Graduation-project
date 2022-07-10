import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Checkout } from './../Models/types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { UserService } from '../Services/user.service';
import moment from 'moment';

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
  public checkoutData!: Checkout;
  public paymentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private errorService: HandelErrorService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      this.hash = param.hash;
      this.getPaymentSummary();
      this.initializePaymentForm();
    });
  }

  initializePaymentForm() {
    this.paymentForm = this.fb.group({
      panNumber: this.fb.control('', [
        Validators.required,
        Validators.minLength(16),
      ]),
      expiryDate: this.fb.control('', [Validators.required]),
      cardHolder: this.fb.control('', [Validators.required]),
      CVV: this.fb.control('', [Validators.required, Validators.maxLength(3)]),
      checkoutId: this.fb.control(this.hash, [Validators.required]),
    });
  }

  getPaymentSummary() {
    this.loading = true;
    this.userService.getCheckoutData(this.hash).subscribe(
      ({ data }) => {
        this.loading = false;
        this.checkoutData = data.checkout;
      },
      (error) => {
        this.loading = false;
        this.error = error.errors[0];
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  submit() {
    moment(this.paymentForm.value.expiryDate, 'MM/YY').format('MM');
    console.log(this.paymentForm.value);
  }

  addSlash(e: any) {
    let monthRegex = /^\d\d$/;
    var isMonthEntered = monthRegex.exec(e.target.value);
    if (e.key >= 0 && e.key <= 9 && isMonthEntered) {
      e.target.value = e.target.value + ' / ';
    }
  }
}
