import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInactivationComponent } from './confirm-inactivation.component';

describe('ConfirmInactivationComponent', () => {
  let component: ConfirmInactivationComponent;
  let fixture: ComponentFixture<ConfirmInactivationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmInactivationComponent]
    });
    fixture = TestBed.createComponent(ConfirmInactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
