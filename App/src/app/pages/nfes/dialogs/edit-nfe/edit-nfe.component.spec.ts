import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNfeComponent } from './edit-nfe.component';

describe('EditNfeComponent', () => {
  let component: EditNfeComponent;
  let fixture: ComponentFixture<EditNfeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNfeComponent]
    });
    fixture = TestBed.createComponent(EditNfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
