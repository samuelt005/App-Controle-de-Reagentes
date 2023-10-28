import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypeComponent } from './new-type.component';

describe('NewTypeComponent', () => {
  let component: NewTypeComponent;
  let fixture: ComponentFixture<NewTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTypeComponent]
    });
    fixture = TestBed.createComponent(NewTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
