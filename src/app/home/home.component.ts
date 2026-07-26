import {} from 'googlemaps';

import { Component, OnInit } from '@angular/core';

import { Estado } from '../shared/interfaces/estados.interface';
import { ExpressaoPesquisada } from '../shared/interfaces/expressoes-pesquisadas.interface';
import { Municipio } from '../shared/interfaces/municipios.interface';
import { IbgeService } from '../shared/services/ibge.service';
import { MunicipiosService } from '../shared/services/municipios.service';
import { ArquivoService } from '../shared/services/arquivo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  textoPesquisa: string = '';
  infos: Array<google.maps.places.PlaceResult & { selecionado?: boolean }> = [];
  expressoes: Array<ExpressaoPesquisada> = [];
  estados: Array<Estado> = [];
  estadoSelecionado: string = '';
  municipios: Array<Municipio> = [];
  municipioSelecionado: Municipio | undefined;
  municipiosPorFaixa: boolean = true;
  paginacao: google.maps.places.PlaceSearchPagination | undefined;
  municipiosPorEstado: Array<any> = [];
  estado: Estado | undefined;
  todosSelecionados: boolean = false;
  query: {location: google.maps.LatLng; query: string; fields: Array<string>} | undefined;

  buscando = false;

  constructor(
    private ibgeService: IbgeService,
    private municipiosService: MunicipiosService,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void {
    this.buscarUFs();
  }

  buscarUFs() {
    this.ibgeService.buscarEstados().subscribe((retorno) => {
      this.estados = retorno.sort((a, b) => {
        const valor =
          a.nome.toUpperCase() < b.nome.toLocaleUpperCase()
            ? -1
            : a.nome.toUpperCase() > b.nome.toLocaleUpperCase()
            ? 1
            : 0;
        return valor;
      });
    });
  }

  alteracaoEstado() {
    this.municipioSelecionado = undefined;
    this.buscarMunicipio();
  }

  buscarMunicipio() {
    if (this.municipiosPorFaixa) {
      this.municipios = this.municipiosService.listaMunicipiosFaixaPopulacao(
        this.estadoSelecionado
      );
    } else {
      this.municipios = this.municipiosService.listaMunicipios(
        this.estadoSelecionado
      );
    }
  }

  buscar() {
    this.buscando = true;
    this.infos = [];
    const location = new google.maps.LatLng(
      this.municipioSelecionado!.lat,
      this.municipioSelecionado!.lon
    );

    const map = new google.maps.Map(document.getElementById('map')!, {
      center: location,
      zoom: 15,
    });

    this.query = {
      location: location,
      query: this.textoPesquisa,
      fields: ['place_id'],
    };

    const service = new google.maps.places.PlacesService(map);
    service.textSearch(this.query, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.paginacao = pagination;
        results.forEach((result) => {
          const details = {
            placeId: result.place_id!,
            fields: [
              'name',
              'formatted_address',
              'formatted_phone_number',
              'international_phone_number',
              'website',
            ],
          };
          service.getDetails(details, (places, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              places
            ) {
              if (places.formatted_phone_number || places.website) {
                this.infos.push(places);
                this.buscando = false;
              }
            }
          });
        });
      } else {
        this.buscando = false;
      }
    });
  }

  buscarProximosResultados() {
    if (this.paginacao && this.paginacao.hasNextPage) {
      this.buscando = true;
      this.paginacao.nextPage();
    }
  }

  enviarMensagem(formatted_phone_number: string) {
    const contatoWpp = this.formatarLink(formatted_phone_number);
    window.open(contatoWpp, '_blank');
  }

  formatarLink(formatted_phone_number: string): string {
    const numero =
      '55' +
      formatted_phone_number
        ?.replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
        .replaceAll(' ', '');

    return 'https://wa.me/' + numero;
  }

  selecionarPalavra(palavra: string) {
    if (this.textoPesquisa.length) {
      this.textoPesquisa += ' ' + palavra;
    } else {
      this.textoPesquisa = palavra;
    }
  }

  selecionarTodos() {
    this.infos.forEach((info) => (info.selecionado = !this.todosSelecionados));
  }

  contatoSelecionado(): boolean {
    return this.infos.some((info) => info.selecionado);
  }

  exportarContatosSelecionados() {
    const cabecalho = 'Nome,Endereco,Telefone,Site';
    const infosSelecionadas: Array<any> = [];
    this.infos.forEach((info) => {
      if (info.selecionado) {
        infosSelecionadas.push({
          nome: info.name.replaceAll(',', ' - '),
          endereco: info.formatted_address
            ? info.formatted_address.replaceAll(',', ' - ')
            : '',
          telefone: info.formatted_phone_number
            ? this.formatarLink(info.formatted_phone_number)
            : '',
          site: info.website ? info.website : '',
        });
      }
    });
    this.arquivoService.gerarCsv(
      cabecalho,
      infosSelecionadas,
      this.municipioSelecionado!.name
    );
  }
}
