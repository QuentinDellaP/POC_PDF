import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArraySkillsUpdateComponent } from './array-skills-update.component';

describe('ArraySkillsUpdateComponent', () => {
  let component: ArraySkillsUpdateComponent;
  let fixture: ComponentFixture<ArraySkillsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArraySkillsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArraySkillsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
