import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoEditComponent } from './aviso-edit.component';

describe('AvisoEditComponent', () => {
  let component: AvisoEditComponent;
  let fixture: ComponentFixture<AvisoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
