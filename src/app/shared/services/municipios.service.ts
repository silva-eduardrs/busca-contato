import { Injectable } from '@angular/core';
import { municipios } from '../contants/municipios';
import { Municipio } from '../interfaces/municipios.interface';

@Injectable({
  providedIn: 'root',
})
export class MunicipiosService {
  municipios = municipios;

  constructor() {}

  listaMunicipios(uf: string): Array<Municipio> {
    return this.municipios.filter((m) => m.uf_code === uf);
  }

  listaMunicipiosFaixaPopulacao(uf: string): Array<Municipio> {
    return this.municipios
      .filter((m) => m.uf_code === uf)
      .filter((m) => m.pop_21 >= 80000);
  }
}

/*
  269 municipios com população acima de 120K
  416 municipios com população acima de 80K
*/
