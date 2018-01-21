import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarComponent } from './descargar.component';

describe('DescargarComponent', () => {
  let component: DescargarComponent;
  let fixture: ComponentFixture<DescargarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
