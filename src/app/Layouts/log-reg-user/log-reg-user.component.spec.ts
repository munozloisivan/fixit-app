import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegUserComponent } from './log-reg-user.component';

describe('LogRegUserComponent', () => {
  let component: LogRegUserComponent;
  let fixture: ComponentFixture<LogRegUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRegUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
