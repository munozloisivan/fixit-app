import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorLoginComponent } from './gestor-login.component';

describe('GestorLoginComponent', () => {
  let component: GestorLoginComponent;
  let fixture: ComponentFixture<GestorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
