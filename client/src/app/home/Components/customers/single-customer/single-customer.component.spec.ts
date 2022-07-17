import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCustomerComponent } from './single-customer.component';

describe('SingleCustomerComponent', () => {
  let component: SingleCustomerComponent;
  let fixture: ComponentFixture<SingleCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
