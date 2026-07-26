import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  csvContent = '';

  constructor() {}

  gerarCsv(cabecalho: string, conteudo: Array<any>, nomeArquivo: string) {
    this.csvContent += cabecalho + '\n';
    conteudo.forEach((row) => {
      this.csvContent += Object.values(row).join(',') + '\n';
    });
    this.gerarArquivo(nomeArquivo);
  }

  gerarArquivo(nomeArquivo: string) {
    const blob = new Blob([this.csvContent], { type: 'text/csv;charset=utf-8,' });
    const objUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = nomeArquivo;
    link.href = objUrl;
    link.click();
  }
}
