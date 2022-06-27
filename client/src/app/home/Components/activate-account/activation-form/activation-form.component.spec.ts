import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationFormComponent } from './activation-form.component';

describe('ActivationFormComponent', () => {
  let component: ActivationFormComponent;
  let fixture: ComponentFixture<ActivationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
