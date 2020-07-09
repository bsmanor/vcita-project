import { TestBed } from '@angular/core/testing';

import { VcitaService } from './vcita.service';

describe('VcitaService', () => {
  let service: VcitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
