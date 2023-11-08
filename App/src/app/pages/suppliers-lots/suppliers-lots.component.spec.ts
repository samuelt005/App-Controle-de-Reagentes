import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersLotsComponent } from './suppliers-lots.component';

describe('SuppliersLotsComponent', () => {
  let component: SuppliersLotsComponent;
  let fixture: ComponentFixture<SuppliersLotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersLotsComponent]
    });
    fixture = TestBed.createComponent(SuppliersLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
