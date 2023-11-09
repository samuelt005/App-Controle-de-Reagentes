import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseLotsComponent } from './purchase-lots.component';

describe('PurchaseLotsComponent', () => {
  let component: PurchaseLotsComponent;
  let fixture: ComponentFixture<PurchaseLotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseLotsComponent]
    });
    fixture = TestBed.createComponent(PurchaseLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
