# Maptriz — Teste Técnico

Cadastro de imóveis georreferenciados: listagem com filtros e paginação, cadastro,
edição, exclusão, gestão de proprietários e visualização em mapa.

Este repositório contém a **solução** do desafio. O enunciado original está
preservado em [`docs/ENUNCIADO.md`](docs/ENUNCIADO.md).

<!-- TODO: dois parágrafos seus contando o que é o projeto e como você o abordou. -->

## Documentação

| Documento                                | Conteúdo                                                         |
| ---------------------------------------- | ---------------------------------------------------------------- |
| [`docs/REVISAO.md`](docs/REVISAO.md)     | Parte 1 — problemas encontrados, gravidade e o que foi corrigido |
| [`docs/DECISOES.md`](docs/DECISOES.md)   | Parte 2 — decisões técnicas de cada tarefa                       |
| [`docs/ENUNCIADO.md`](docs/ENUNCIADO.md) | Enunciado original do desafio                                    |

O acompanhamento do trabalho foi feito por **GitHub Issues**, com template próprio
para cada parte: [Parte 1](https://github.com/MatheusVictorMartins/desafio-tecnico/issues?q=label%3Aparte-1) (achados da revisão,
rotulados por gravidade e área) e [Parte 2](https://github.com/MatheusVictorMartins/desafio-tecnico/issues?q=label%3Aparte-2)
(tarefas do enunciado). Cada issue registra o problema, a justificativa da
gravidade e a decisão tomada.

## Stack

| Camada   | Tecnologia                                                            |
| -------- | --------------------------------------------------------------------- |
| Backend  | Java 21, Spring Boot 3.5.16, Spring Data JPA, Bean Validation, Lombok |
| Banco    | PostgreSQL, versionado com Flyway                                     |
| Frontend | Angular 22 (standalone + signals), Reactive Forms, SCSS               |
| Mapa     | Leaflet 1.9 com tiles do OpenStreetMap                                |
| Build    | Maven Wrapper, Angular CLI                                            |

## Pré-requisitos

- JDK 21
- PostgreSQL rodando em `localhost:5432`
- Node.js 20+

## Como rodar

### 1. Banco de dados

#### Opção A - Docker(Recomendada)

```bash
sudo docker compose up -d
```
_Caso estiver no windows, será preciso antes iniciar o Docker Desktop antes._

Caso seja preciso começar um banco de dados do zero:

```bash
sudo docker compose down -v
sudo docker compose up -d
```

**Obs: Pode ser necessário caso algum erro de fly way ocorra por conta de alguma tabela antiga. Como por exemplo o erro:**

```bash
Found non-empty schema without schema history table
```

#### Opção B - Postgres local sem docker

```bash
sudo -u postgres psql -f scripts/setup-db.sql
```

Cria o banco `webgis`. A aplicação conecta como `postgres` — ajuste as
credenciais em `backend/src/main/resources/application.properties` se o seu
Postgres usar outra senha.

O schema **não** é gerado pelo Hibernate: `spring.jpa.hibernate.ddl-auto=validate`
e as tabelas vêm das migrations do Flyway, aplicadas automaticamente na primeira
subida do backend.

| Migration                           | O que faz                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `V1__create_table_imovel.sql`       | Cria a tabela `imovel`                                                                     |
| `V2__seed_imovel.sql`               | Popula 12 imóveis de exemplo                                                               |
| `V3__create_table_proprietario.sql` | Cria `proprietario` e migra os nomes que existiam como texto em `imovel`, sem perder dados |

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Sobe em `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Abre em `http://localhost:4200`.

## O que foi entregue

| #   | Tarefa                                                  | Issue                                                                    | Status       |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------ | ------------ |
| 1   | Separar em duas páginas                                 | [#14](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/14) | Entregue     |
| 2   | Filtros na listagem                                     | [#15](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/15) | Entregue     |
| 3   | Página de edição                                        | [#16](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/16) | Entregue     |
| 4   | Página de proprietários                                 | [#17](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/17) | Entregue     |
| 5   | Renomear proprietário                                   | [#18](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/18) | Entregue     |
| 6   | Preparar a listagem para grande volume                  | [#20](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/20) | Entregue     |
| 7   | Mapa                                                    | [#21](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/21) | Entregue     |
| 8   | Georreferenciamento sem sobreposição (opcional, sênior) | [#22](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/22) | Não entregue |

As decisões de cada uma estão em [`docs/DECISOES.md`](docs/DECISOES.md).

Na revisão da Parte 1, **16 dos 18 problemas encontrados foram corrigidos**,
incluindo todas as 7 críticas. Os 2 restantes estão listados com justificativa
em [`docs/REVISAO.md`](docs/REVISAO.md).

## API

Base: `http://localhost:8080`

### Imóveis

| Método   | Rota                | Descrição                                           |
| -------- | ------------------- | --------------------------------------------------- |
| `GET`    | `/api/imoveis`      | Lista paginada, com filtros                         |
| `GET`    | `/api/imoveis/mapa` | Lista completa, **sem paginação** — alimenta o mapa |
| `GET`    | `/api/imoveis/{id}` | Busca por id                                        |
| `POST`   | `/api/imoveis`      | Cadastra                                            |
| `PUT`    | `/api/imoveis/{id}` | Atualiza                                            |
| `DELETE` | `/api/imoveis/{id}` | Exclui                                              |

Parâmetros de `GET /api/imoveis`:

| Parâmetro      | Padrão | Descrição                                  |
| -------------- | ------ | ------------------------------------------ |
| `municipio`    | —      | Filtro parcial, sem diferenciar maiúsculas |
| `proprietario` | —      | Filtro parcial pelo nome do proprietário   |
| `page`         | `0`    | Página (base zero)                         |
| `size`         | `10`   | Registros por página                       |
| `sort`         | `id`   | Campo de ordenação                         |

### Proprietários

| Método | Rota                              | Descrição                                                           |
| ------ | --------------------------------- | ------------------------------------------------------------------- |
| `GET`  | `/api/proprietarios`              | Lista paginada                                                      |
| `GET`  | `/api/proprietarios/todos`        | Lista completa, **sem paginação** — alimenta o select do formulário |
| `GET`  | `/api/proprietarios/{id}/imoveis` | Imóveis do proprietário, paginado                                   |
| `PUT`  | `/api/proprietarios/{id}`         | Renomeia                                                            |

> As duas rotas sem paginação são intencionais: mapa e `<select>` precisam do
> conjunto inteiro, não de uma página. O motivo está em
> [`docs/DECISOES.md`](docs/DECISOES.md).

### Erros

As respostas de erro seguem [RFC 7807 (Problem Details)](https://www.rfc-editor.org/rfc/rfc7807),
centralizadas em `TratadorDeErros`:

```json
{
	"type": "about:blank",
	"title": "Recurso não encontrado!",
	"status": 404,
	"detail": "Imóvel 99 não encontrado",
	"instance": "/api/imoveis/99"
}
```

## Rotas do frontend

| Rota                         | Página                           |
| ---------------------------- | -------------------------------- |
| `/imoveis`                   | Listagem com filtros e paginação |
| `/imoveis/cadastra_imoveis`  | Cadastro                         |
| `/imoveis/:id/editar`        | Edição                           |
| `/imoveis/mapa`              | Mapa dos imóveis                 |
| `/proprietarios`             | Listagem de proprietários        |
| `/proprietarios/:id/imoveis` | Imóveis de um proprietário       |
| `**`                         | Página 404                       |

Todas as rotas usam `loadComponent`, então cada página é um bundle carregado sob
demanda.

## Estrutura

```
backend/src/main/java/br/com/webgis/
├── imovel/          controller, service, repository, model, exception
├── proprietario/    controller, service, repository, model, exception
└── comum/           TratadorDeErros

frontend/src/app/
├── imoveis/         pages, components, services
├── proprietarios/   pages, services
└── pages/           nao-encontrado
```
