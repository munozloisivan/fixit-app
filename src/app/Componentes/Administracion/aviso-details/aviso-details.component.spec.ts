import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoDetailsComponent } from './aviso-details.component';

describe('AvisoDetailsComponent', () => {
  let component: AvisoDetailsComponent;
  let fixture: ComponentFixture<AvisoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
