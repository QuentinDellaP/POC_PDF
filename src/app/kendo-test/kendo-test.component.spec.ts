import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoTestComponent } from './kendo-test.component';

describe('KendoTestComponent', () => {
  let component: KendoTestComponent;
  let fixture: ComponentFixture<KendoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
