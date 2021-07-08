import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonMaterialComponent } from './lesson-material.component';

describe('LessonMaterialComponent', () => {
  let component: LessonMaterialComponent;
  let fixture: ComponentFixture<LessonMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
