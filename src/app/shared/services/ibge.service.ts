import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estados.interface';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private baseUrl = 'https://servicodados.ibge.gov.br/api/v1';

  constructor(private http: HttpClient) { }

  buscarEstados(): Observable<Array<Estado>>  {
    return this.http.get<Array<Estado>>(this.baseUrl + '/localidades/estados');
  }
}
