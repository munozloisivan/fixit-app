import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoGestionComponent } from './aviso-gestion.component';

describe('AvisoGestionComponent', () => {
  let component: AvisoGestionComponent;
  let fixture: ComponentFixture<AvisoGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
