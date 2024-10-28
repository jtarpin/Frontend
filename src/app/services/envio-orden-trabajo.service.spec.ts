import { TestBed } from '@angular/core/testing';

import { EnvioOrdenTrabajoService } from './envio-orden-trabajo.service';

describe('EnvioOrdenTrabajoService', () => {
  let service: EnvioOrdenTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioOrdenTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
