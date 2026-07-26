import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpressaoPesquisada } from '../interfaces/expressoes-pesquisadas.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpressoesPesquisadasService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  recuperarExpressoesPesquisadas(): Observable<Array<ExpressaoPesquisada>>  {
    return this.http.get<Array<ExpressaoPesquisada>>(this.baseUrl + '/expressoes-pesquisadas');
  }

  alterarExpressaoPesquisada(id: number, payload: any) {
    return this.http.put(this.baseUrl + '/expressoes-pesquisadas/' + id.toString(), payload);
  }

  gravarExpressaoPesquisada(payload: any) {
    return this.http.post(this.baseUrl + '/expressoes-pesquisadas', payload);
  }

  excluirExpressaoPesquisada(id: number) {
    return this.http.delete(this.baseUrl + '/expressoes-pesquisadas/' + id.toString());
  }
}
