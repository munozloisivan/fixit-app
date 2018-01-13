import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorRegistroComponent } from './gestor-registro.component';

describe('GestorRegistroComponent', () => {
  let component: GestorRegistroComponent;
  let fixture: ComponentFixture<GestorRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
