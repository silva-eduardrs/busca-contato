import { TestBed } from '@angular/core/testing';

import { ExpressoesPesquisadasService } from './expressoes-pesquisadas.service';

describe('ExpressoesPesquisadasService', () => {
  let service: ExpressoesPesquisadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressoesPesquisadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
