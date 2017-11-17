import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoAdminComponent } from './aviso-admin.component';

describe('AvisoAdminComponent', () => {
  let component: AvisoAdminComponent;
  let fixture: ComponentFixture<AvisoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
