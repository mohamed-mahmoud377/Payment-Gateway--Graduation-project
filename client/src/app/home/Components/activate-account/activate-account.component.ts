import { BusinessTypes, Industries } from './../../../Models/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  public types = [
    { value: BusinessTypes.company, name: 'Company' },
    { value: BusinessTypes.individual, name: 'Individual' },
  ];
  public industries = [
    { value: Industries.software, name: 'Software' },
    { value: Industries.clothing, name: 'Clothing' },
    { value: Industries.digitalProducts, name: 'Digital Products' },
    { value: Industries.education, name: 'Education' },
    { value: Industries.entertainment, name: 'Entertainment' },
    { value: Industries.food, name: 'Food & Drinks' },
    { value: Industries.medical, name: 'Medical Services' },
    { value: Industries.travel, name: 'Travel' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
