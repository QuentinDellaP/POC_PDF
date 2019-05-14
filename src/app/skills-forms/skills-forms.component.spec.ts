import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsFormsComponent } from './skills-forms.component';

describe('SkillsFormsComponent', () => {
  let component: SkillsFormsComponent;
  let fixture: ComponentFixture<SkillsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
