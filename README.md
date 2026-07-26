# Buscador de Contatos

Projeto criado para listar contatos de acordo com o município buscado (v0.0.1)

## Ferramentas de busca

#### IBGE

Utilizada API do IBGE (https://servicodados.ibge.gov.br/api/v1) para buscar os estados da Federação

#### Registros Censo 2021

Os dados da população foram retiradas da tabela disponibilizada em https://github.com/mapaslivres/municipios-br
E incorporada na aplicação na forma de arquivo JSON utilizando https://csvjson.com/

#### Google Maps

Os contatos são recuperados utilizando primeiramente a referência das coordenadas do município selecionado pelo Maps e posteriormente passado via textSearch para o PlacesService

## Tecnologias utilizadas

#### Angular : 15.2.0

#### NG Bootstrap : 14.2.0

#### Bootstrap : 5.2.3


