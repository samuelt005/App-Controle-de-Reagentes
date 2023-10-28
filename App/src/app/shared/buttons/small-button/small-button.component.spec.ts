import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallButtonComponent } from './small-button.component';

describe('SmallButtonComponent', () => {
  let component: SmallButtonComponent;
  let fixture: ComponentFixture<SmallButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallButtonComponent]
    });
    fixture = TestBed.createComponent(SmallButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
