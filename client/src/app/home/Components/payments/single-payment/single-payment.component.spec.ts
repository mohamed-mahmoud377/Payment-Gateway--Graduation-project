import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePaymentComponent } from './single-payment.component';

describe('SinglePaymentComponent', () => {
  let component: SinglePaymentComponent;
  let fixture: ComponentFixture<SinglePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
