import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { omitBy } from 'lodash';
import { UserService } from 'src/app/Services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BusinessTypes, Industries } from './../../../Models/types';
import { Component, OnInit } from '@angular/core';
import { cleanObject } from 'src/app/shared/utils/cleanObj';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {
    this.initializeActivateForm();
  }

  initializeActivateForm() {
    this.activateCtrl = this.fb.group({
      businessInfo: this.fb.group({
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
    const inputs = {
      businessInfo: cleanObject(this.businessInfoCtrl.value),
      businessOwner: cleanObject(this.businessOwnerCtrl.value),
      bankAccount: cleanObject(this.backAccountCtrl.value),
    };

    this.userService.activateAccount(inputs).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.errorService.handleActivateError(error, this.activateCtrl);
      }
    );
  }

  get businessInfoCtrl() {
    return this.activateCtrl.get('businessInfo') as FormGroup;
  }
  get businessOwnerCtrl() {
    return this.activateCtrl.get('businessOwner') as FormGroup;
  }
  get backAccountCtrl() {
    return this.activateCtrl.get('bankAccount') as FormGroup;
  }

  get addressCtrl() {
    return this.activateCtrl.get('businessInfo.address') as FormControl;
  }
  get typeCtrl() {
    return this.activateCtrl.get('businessInfo.type') as FormControl;
  }
  get industryCtrl() {
    return this.activateCtrl.get('businessInfo.industry') as FormControl;
  }
  get legalNameCtrl() {
    return this.activateCtrl.get('businessInfo.legalName') as FormControl;
  }
  get registrationNumberCtrl() {
    return this.activateCtrl.get(
      'businessInfo.registrationNumber'
    ) as FormControl;
  }
  get websiteCtrl() {
    return this.activateCtrl.get('businessInfo.website') as FormControl;
  }
  get descriptionCtrl() {
    return this.activateCtrl.get(
      'businessInfo.productDescription'
    ) as FormControl;
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
