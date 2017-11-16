import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioForgotComponent } from './usuario-forgot.component';

describe('UsuarioForgotComponent', () => {
  let component: UsuarioForgotComponent;
  let fixture: ComponentFixture<UsuarioForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
