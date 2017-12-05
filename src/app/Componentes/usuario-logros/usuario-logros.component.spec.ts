import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLogrosComponent } from './usuario-logros.component';

describe('UsuarioLogrosComponent', () => {
  let component: UsuarioLogrosComponent;
  let fixture: ComponentFixture<UsuarioLogrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioLogrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioLogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
