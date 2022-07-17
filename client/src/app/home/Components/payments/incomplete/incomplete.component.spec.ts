import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteComponent } from './incomplete.component';

describe('IncompleteComponent', () => {
  let component: IncompleteComponent;
  let fixture: ComponentFixture<IncompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
