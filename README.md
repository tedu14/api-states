\*\*

# API de Estados Brasileiros

a api trabalha com a leitura de 2 arquivos json, onde um está as informações de cada Estado brasileiro, e outra com todas as cidades.

## Métodos de consulta

Somente métodos GET

## Caminhos

#### GET /states

- Retorna uma array com todos os Estados

#### GET /states/:uf

- Retorna a quantidade de cidades do Estado e as informações do mesmo.

#### GET /min-states

- Retorna um array com os 5 Estado que tem menos cidades, em ordem crescente.

#### GET /max-states

- Retorna um array com os 5 Estados que tem mais cidades, em ordem crescentes.

#### GET /citys-max

- Retorna a Cidade de maior nome de cada Estado, em ordem decrescente, e obedecendo a hierárquia alfabética em caso de empate entre cidades.

#### GET /citys-min

- Retorna a Cidade de menor nome de cada Estado, em ordem crescente, e obedecendo a hierárquia alfabética em caso de empate entre cidades.

#### GET /city-max

- Retorna a Cidade de maior nome entre Todos os Estados

#### GET /city-min

- Retorna a Cidade de menor nome entre Todos os Estados

\*\*
