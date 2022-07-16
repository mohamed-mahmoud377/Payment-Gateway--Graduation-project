import { UserService } from 'src/app/Services/user.service';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandle: HandelErrorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}
