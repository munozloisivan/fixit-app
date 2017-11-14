import { TestBed, inject } from '@angular/core/testing';

import { GestorService } from './gestor.service';

describe('GestorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestorService]
    });
  });

  it('should be created', inject([GestorService], (service: GestorService) => {
    expect(service).toBeTruthy();
  }));
});
