import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNfeComponent } from './new-nfe.component';

describe('NewNfeComponent', () => {
  let component: NewNfeComponent;
  let fixture: ComponentFixture<NewNfeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewNfeComponent]
    });
    fixture = TestBed.createComponent(NewNfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
