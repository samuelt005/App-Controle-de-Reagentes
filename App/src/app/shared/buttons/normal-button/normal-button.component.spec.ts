import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalButtonComponent } from './normal-button.component';

describe('ButtonComponent', () => {
  let component: NormalButtonComponent;
  let fixture: ComponentFixture<NormalButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalButtonComponent]
    });
    fixture = TestBed.createComponent(NormalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
