import { TestBed, inject } from '@angular/core/testing';

import { LogroService } from './logro.service';

describe('LogroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogroService]
    });
  });

  it('should be created', inject([LogroService], (service: LogroService) => {
    expect(service).toBeTruthy();
  }));
});
