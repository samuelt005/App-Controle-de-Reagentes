import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentaryComponent } from './new-commentary.component';

describe('NewCommentaryComponent', () => {
  let component: NewCommentaryComponent;
  let fixture: ComponentFixture<NewCommentaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCommentaryComponent]
    });
    fixture = TestBed.createComponent(NewCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
