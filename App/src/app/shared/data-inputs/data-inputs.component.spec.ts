import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInputsComponent } from './data-inputs.component';

describe('DataInputsComponent', () => {
  let component: DataInputsComponent;
  let fixture: ComponentFixture<DataInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataInputsComponent]
    });
    fixture = TestBed.createComponent(DataInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
