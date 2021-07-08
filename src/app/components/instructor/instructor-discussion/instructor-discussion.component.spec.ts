import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDiscussionComponent } from './instructor-discussion.component';

describe('InstructorDiscussionComponent', () => {
  let component: InstructorDiscussionComponent;
  let fixture: ComponentFixture<InstructorDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
