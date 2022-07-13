import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Checkout, payInputs } from './../Models/types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from '../Services/shared/handle-errors.service';
import { UserService } from '../Services/user.service';
import { luhnValidator } from '../shared/utils/ccValidator';

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
        Validators.pattern('^[0-9]*$'),
        luhnValidator(),
      ]),
      expiryDate: this.fb.control('', [Validators.required]),
      cardHoldName: this.fb.control('', [Validators.required]),
      CVC: this.fb.control('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern(/^\d{3}$/),
      ]),
      checkoutId: this.fb.control(this.hash, [Validators.required]),
    });
  }

  getPaymentSummary() {
    this.loading = true;
    this.userService.getCheckoutData(this.hash).subscribe(
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

  submit() {
    let month = +this.removeLeadingZero(this.expiryDate?.value.split(' / ')[0]);
    let year = +this.expiryDate?.value.split(' / ')[1];
    this.paymentForm.removeControl('expiryDate');
    let inputs = { ...this.paymentForm.value, month, year };
    this.pay(inputs);
  }

  pay(inputs: payInputs) {
    this.userService.pay(inputs).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  addSlash(e: any) {
    let monthRegex = /^\d\d$/;
    var isMonthEntered = monthRegex.exec(e.target.value);
    if (e.key >= 0 && e.key <= 9 && isMonthEntered) {
      e.target.value = e.target.value + ' / ';
    }
  }

  removeLeadingZero(month: string) {
    if (month.startsWith('0')) {
      month = month.substring(1);
      return month;
    }
    return month;
  }

  get panNumber() {
    return this.paymentForm.get('panNumber');
  }

  get expiryDate() {
    return this.paymentForm.get('expiryDate');
  }

  get CVCCtrl() {
    return this.panNumber?.get('CVC');
  }

  get cardHolderCtrl() {
    return this.paymentForm.get('cardHoldName');
  }
}
