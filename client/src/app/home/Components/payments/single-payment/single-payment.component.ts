import { HandelErrorService } from './../../../../Services/shared/handle-errors.service';
import { UserService } from 'src/app/Services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-payment',
  templateUrl: './single-payment.component.html',
  styleUrls: ['./single-payment.component.css'],
  providers: [MessageService],
})
export class SinglePaymentComponent implements OnInit {
  public id!: string;
  public payment!: any;
  public loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.getPayment(this.id);
    });
  }

  getPayment(id: string) {
    this.loading = true;
    this.userService.getPayment(id).subscribe(
      ({ data }) => {
        this.loading = false;
        this.payment = data.payment;
        console.log(this.payment);
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
