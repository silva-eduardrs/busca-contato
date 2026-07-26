import { TestBed } from '@angular/core/testing';

import { MunicipiosService } from './municipios.service';

describe('MunicipiosService', () => {
  let service: MunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
