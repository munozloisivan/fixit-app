import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAvisosComponent } from './usuario-avisos.component';

describe('UsuarioAvisosComponent', () => {
  let component: UsuarioAvisosComponent;
  let fixture: ComponentFixture<UsuarioAvisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAvisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
