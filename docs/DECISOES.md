# Parte 2 — Decisões técnicas por tarefa

Uma seção por tarefa entregue. Cada uma parte do campo **Decisão a documentar**
da issue correspondente.

| # | Tarefa | Issue | Status |
| - | ------ | ----- | ------ |
| 1 | Separar em duas páginas | [#14](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/14) | Entregue |
| 2 | Filtros na listagem | [#15](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/15) | Entregue |
| 3 | Página de edição | [#16](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/16) | Entregue |
| 4 | Página de proprietários | [#17](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/17) | Entregue |
| 5 | Renomear proprietário | [#18](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/18) | Entregue |
| 6 | Preparar a listagem para grande volume | [#20](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/20) | Entregue |
| 7 | Mapa | [#21](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/21) | Entregue |
| 8 | Georreferenciamento sem sobreposição | [#22](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/22) | Não entregue |

### Sequência de desenvolvimeno escolhida

O projeto foi desenvolvido na sequência 1 → 3 → 4 → 5 → 6 → 2 → 7, e não na ordem sugerida pelo enunciado. O critério foi agrupar tarefas que mexem nas mesmas partes do sistema, reduzindo a troca de contexto e o retrabalho.

As tarefas 1, 3 e 4 foram feitas em bloco porque todas envolvem criar e manipular rotas no Angular. Separar a listagem do cadastro (1) deixou o formulário isolado em um componente próprio, e isso tornou a página de edição (3) o passo seguinte mais barato: bastava reaproveitar o mesmo formulário em uma terceira rota, em vez de construir uma tela nova. A tarefa 4 fecha esse bloco por também ser uma rota nova e, ao mesmo tempo, abre o assunto proprietário, ao promovê-lo a entidade própria.

Com o proprietário já modelado, a tarefa 5 veio na sequência natural: renomear é consequência direta da modelagem feita em 4, e executá-la logo em seguida aproveitou o contexto ainda fresco.

Resolvidas as páginas e o proprietário, restaram as tarefas que adicionam comportamento a telas já existentes: paginação (6) e filtros (2). A paginação veio primeiro por um motivo concreto: as duas mexem no mesmo endpoint de listagem e no mesmo método do store. Se os filtros tivessem vindo antes, teriam sido reescritos quando a paginação chegasse, onde na ordem inversa, seria implementar duas vezes.

A tarefa 7 ficou por último por ser independente das demais e opcional no enunciado: ela consome um endpoint próprio e não altera nenhuma tela existente, então podia entrar a qualquer momento sem bloquear nada.

## 1. Separar em duas páginas

**Issue:** [#14](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/14)

**O que foi feito:** listagem e cadastro passaram a ser rotas distintas
(`/imoveis` e `/imoveis/cadastra_imoveis`), com o formulário extraído para o
componente `FormImoveis`, reaproveitado depois na edição.

**Decisões:** Para essa tarefa o formulário foi separado em um componente próprio para evitar o retrabalho e trazer uma melhora na leitura e manutenção deste, além de que facilitou muito a tarefa 3 por ter um formulário a parte e não precisar redecralar toda a tabela HTML e seu respectivo CSS, onde toda mudança feita, seria ajustada automaticamente em ambos.

---

## 2. Filtros na listagem

**Issue:** [#15](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/15)

**O que foi feito:** filtro por município e por proprietário no mesmo endpoint
de listagem, aplicado no banco e combinado com a paginação.

```java
@Query("""
    select i from Imovel i
    where lower(i.municipio) like lower(concat('%', :municipio, '%'))
      and lower(i.proprietario.nome) like lower(concat('%', :proprietario, '%'))
    """)
Page<Imovel> buscar(String municipio, String proprietario, Pageable pageable);
```
**Decisões**:
- **Filtro direto na consulta com WHERE:**\
R.: Foi pensando isso pois, caso o filtro aplicasse direto na memória da página carregada, poderiam trazer a falta de alguns imóveis, pois como a paginação foi implementada e os elementos que não aparecem naquela página, não são contados na memória, faria com que o filtro funcionasse por página da tabela e não para todos os elementos dela.
- **Uso de uma query ao invés de métodos derivados:**\
R.: Por questão de legibilidade e complexidade de código, onde com query methods seriam feitos 4 métodos, além de precisar realizar condicionais.
- **Pesquisar volta para a página 0**\
R.: Foi pensado na questão da experiência do usuário, onde caso a pesquisa dele não retornasse nenhum dado, ele seria jogado para uma página vazia.

---

## 3. Página de edição

**Issue:** [#16](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/16)
**Requisito especial:** voltar da edição para a listagem não pode disparar nova requisição.

**O que foi feito:** rota `/imoveis/:id/editar` e cache em memória no
`ImovelStore`, com `carregarSeNecessario()` guardado por uma flag `carregado`.

**Decisões:** O maior desafio dessa tarefa era prosseguir junto com o requisito, e no caso foi tomado algumas decisões para que fosse possível como:
- Criar a função `carregarSeNecessario()`, onde ela garante a requisição somente na primeira visita.
- Criar funções que ou lêem direto da memória ou então mantém o cache sempre atualizado sem refazer a requisição GET, como por exemplo a `porId()` e a `atualizarLocal()`.

---

## 4. Página de proprietários

**Issue:** [#17](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/17)
**Requisito especial:** a migração não pode perder os imóveis já cadastrados.

**O que foi feito:** `Proprietario` virou entidade própria, com relacionamento
`@ManyToOne` a partir de `Imovel`. A migração preserva os dados existentes:

```sql
INSERT INTO proprietario (nome) SELECT DISTINCT proprietario FROM imovel;
ALTER TABLE imovel ADD COLUMN proprietario_id BIGINT REFERENCES proprietario (id);
UPDATE imovel i SET proprietario_id = p.id FROM proprietario p WHERE p.nome = i.proprietario;
ALTER TABLE imovel DROP COLUMN proprietario;
```
**Decisões:** Foi pensado em uma solução com chaves estrangeiras e buscas por ID ao invés de nome do proprietário, onde foi criado a tabela e a entidade do proprietário a partir de cada nome distinto da tabela já existente, a qual foi preenchida com a seed. Isso foi feito para que pudesse fazer uma limpa nos dados repetidos e pegar isoladamente cada proprietário. Tudo isso feito na migration V3. Foi trazido também um UNIQUE para o campo nome, onde o cadastro de nomes repetidos poderiam acarretar problemas de compatibilidade do sistema.

---

## 5. Renomear proprietário

**Issue:** [#18](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/18)
**Requisito especial:** a alteração precisa valer para todos os imóveis do proprietário.

**O que foi feito:** `PUT /api/proprietarios/{id}`, alterando o nome na entidade
`Proprietario`.

**Decisões:** Com a solução da tarefa 4 anterior, com o uso de chaves estrangeiras e o nome do proprietário estar em um lugar só, renomear um proprietário faz com que todos os outros imóveis que estão ligados a aquele proprietário, automaticamente se atualizem, sendo assim, decidido pela atualização normal pelo banco de dados, onde a forma que foi realizado a tarefa anterior, facilitou muito a resolução desta.

---

## 6. Preparar a listagem para grande volume

**Issue:** [#20](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/20)
**O enunciado pede explicitamente:** dizer o que foi medido ou assumido.

**O que foi feito:** paginação no servidor (`Page`/`Pageable`, 10 por página)
nas três listagens — imóveis, proprietários e imóveis de um proprietário —
com ordenação estável por `id`.

**Decisões:** Foi optado por realizar o sistema de paginação pela experiência de usuário, sendo que para tabelas e muitos elementos que são parecidos, paginar se torna mais eficiente e confortável para o usuário. Além disso, a tarefa não só pedia algo visualmente melhor para o usuário, mas também garantir que o projeto cresça em dados, sem deixar a tabela inutilizavel, sendo assim, a paginação foi feita no lado do servidor e não pelo cliente, sendo renderizado somente os dados realmente carregados. Foi também optado pela ordenação por id, já que o Postgres pode não garantir ordem entre as páginas.

---

## 7. Mapa

**Issue:** [#21](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/21)

**O que foi feito:** página `/imoveis/mapa` com Leaflet 1.9 consumindo tiles do
OpenStreetMap, um ponto por imóvel a partir de `latitude`/`longitude`, com popup
de proprietário e município e enquadramento automático via `fitBounds`.

**Decisões:** Foi decidido utilizar o Leaflet para a realização dessa tarefa, dado pelos seguintes motivos:
- É open-source e não exige chave de API nem conta em provedor, então o projeto roda sem nenhum passo de configuração externa.
- Expõe uma API imperativa enxuta, que encaixa no ciclo de vida do componente Angular: o mapa é instanciado no ngAfterViewInit, quando a div já existe no DOM, e liberado no ngOnDestroy, junto dos listeners de resize e scroll que ele registra.

Além disso tudo, já havia usado Leaflet em um projeto freelance de necessidade parecida, plotando amostras biológicas de um banco de dados com busca integrada ao mapa.

---

## 8. Georreferenciamento sem sobreposição — não entregue

**Issue:** [#22](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/22)

**Não entregue.**

A tarefa depende de um domínio que eu não tinha, sendo sistemas de coordenadas e operações geométricas em banco. Não pelo volume, mas sim por exigir entender projeção e uso de tecnologias como GIS que não consegui ter tempo para me capacitar. A entrada chega em WGS 84, em graus, e a geometria precisa ser persistida em SRID 31982, em metros. Sem projetar o ponto antes, montar o retângulo a partir de largura e comprimento produz uma figura com ordem de grandeza errada. Nesse cenário, entregar pela metade é pior que não entregar, onde além de poder ser armazenado dados errados no banco de dados, seria muito importante saber lidar com situações como requisições simultâneas e um bom controle de todo os dados que serão armazenados, para garantir precisão.
