import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchaseLotComponent } from './new-purchase-lot.component';

describe('NewPurchaseLotsComponent', () => {
  let component: NewPurchaseLotComponent;
  let fixture: ComponentFixture<NewPurchaseLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPurchaseLotComponent]
    });
    fixture = TestBed.createComponent(NewPurchaseLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
