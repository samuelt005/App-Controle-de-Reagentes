import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseLotComponent } from './edit-purchase-lot.component';

describe('EditPurchaseLotComponent', () => {
  let component: EditPurchaseLotComponent;
  let fixture: ComponentFixture<EditPurchaseLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPurchaseLotComponent]
    });
    fixture = TestBed.createComponent(EditPurchaseLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
