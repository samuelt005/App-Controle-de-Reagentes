import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfesComponent } from './nfes.component';

describe('NfesComponent', () => {
  let component: NfesComponent;
  let fixture: ComponentFixture<NfesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NfesComponent]
    });
    fixture = TestBed.createComponent(NfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
