import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegAdminComponent } from './log-reg-admin.component';

describe('LogRegAdminComponent', () => {
  let component: LogRegAdminComponent;
  let fixture: ComponentFixture<LogRegAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRegAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
