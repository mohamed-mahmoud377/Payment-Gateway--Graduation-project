import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  public activateCtrl!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeActivateForm();
  }

  initializeActivateForm() {
    this.activateCtrl = this.fb.group({
      businessInformation: this.fb.group({
        address: this.fb.control(null, [Validators.required]),
        type: this.fb.control(BusinessTypes.company, [Validators.required]),
        industry: this.fb.control(Industries.software, [Validators.required]),
        legalName: this.fb.control(null, [Validators.required]),
        registrationNumber: this.fb.control(null, [Validators.required]),
        website: this.fb.control(null, [Validators.required]),
        productDescription: this.fb.control(null, [Validators.required]),
      }),
      businessOwner: this.fb.group({
        firstName: this.fb.control(null, [Validators.required]),
        lastName: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
        phone: this.fb.control(null, [Validators.required]),
        nationalId: this.fb.control(null, [Validators.required]),
      }),
      bankAccount: this.fb.group({
        IBAN: this.fb.control(null, [Validators.required]),
      }),
    });
  }

  submit() {
    console.log(this.activateCtrl.value);
  }

  get addressCtr() {
    return this.activateCtrl.get('address') as FormControl;
  }
  get typeCtrl() {
    return this.activateCtrl.get('type') as FormControl;
  }
  get industryCtrl() {
    return this.activateCtrl.get('industry') as FormControl;
  }
  get legalNameCtrl() {
    return this.activateCtrl.get('legalName') as FormControl;
  }
  get registrationNumberCtrl() {
    return this.activateCtrl.get('registrationNumber') as FormControl;
  }
  get websiteCtrl() {
    return this.activateCtrl.get('website') as FormControl;
  }
  get descriptionCtrl() {
    return this.activateCtrl.get('productDescription') as FormControl;
  }
  get firstNameCtrl() {
    return this.activateCtrl.get('firstName') as FormControl;
  }
  get lastNameCtrl() {
    return this.activateCtrl.get('lastName') as FormControl;
  }
  get phoneCtrl() {
    return this.activateCtrl.get('phone') as FormControl;
  }
  get emailCtrl() {
    return this.activateCtrl.get('email') as FormControl;
  }
  get nationalCtrl() {
    return this.activateCtrl.get('nationalId') as FormControl;
  }
  get IBANCtrl() {
    return this.activateCtrl.get('IBAN') as FormControl;
  }
}
