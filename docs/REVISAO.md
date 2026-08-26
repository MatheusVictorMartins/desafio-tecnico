# Parte 1 — Revisão do código existente

Este documento indexa os problemas encontrados na leitura do backend e do
frontend recebidos. Cada linha aponta para a issue correspondente, que contém a
análise completa no formato do template: **onde**, **o que acontece hoje**,
**por que é problema**, **gravidade justificada**, **decisão** e **critério de
aceite**.

Antes de mais nada, é válido explicar um pouco sobre o método utilizado para a realização da etapa de revisão. Primeiro foi adotado o uso do sistema de Issues do github para armazenar cada problema encontrado durante a revisão definindo a gravidade de cada um, sendo especulado de acordo com o que e como aquele problema afeta o sistema em si. Isso foi usado para tanto registro, como forma de me organizar e não me perder dentro do código, e uma forma de registrar tasks a serem feitas, e criar um escopo na resolução de problemas.

## Resumo

| Gravidade | Encontrados | Corrigidos |
| --------- | ----------- | ---------- |
| Crítica   | 7           | 7          |
| Alta      | 3           | 2          |
| Média     | 5           | 5          |
| Baixa     | 3           | 2          |
| **Total** | **18**      | **16**     |

Todas as críticas foram corrigidas. As duas pendências são uma alta e uma baixa,
ambas com justificativa registrada no fim deste documento.

Critério de gravidade adotado:

Foi adotado o seguinte critério:

- Para issues de gravidade crítica, foi levado em consideração problemas que afetam diretamente o funcionamento e/ou a segurança do sistema como um todo e a velocidade desses de quebrar o sistema, onde, sem aquilo resolvido, o sistema pode se tornar inutilizável muito rápido.
- Já para issues de gravidade alta, foi considerado aquelas que são perigosas para o futuro do sistema e seu crescimento, que afetam de certa forma a segurança, mas que ainda permitem o funcionamento atual, mas que podem crescer e impedir que o projeto cresça.
- Para a gravidade média, foi levado mais em conta aquilo que já permite o funcionamento do sistema, muitas vezes o usuário pode não perceber, mas podem abrir brechas para futuros problemas.
- Por fim, para a baixa, já é levado em consideração problemas que não afetam em nada o funcionamento correto do sistema, e sim coisas mais visuais ou convenções de código.

## Problemas encontrados

### Crítica

| Issue                                                                    | Problema                                                           | Área               | Status    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------ | --------- |
| [#9](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/9)   | Brecha de segurança com risco de SQL Injection no back-end         | segurança, banco   | Corrigido |
| [#27](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/27) | Falta de migrations e versionamento de banco de dados              | banco, arquitetura | Corrigido |
| [#12](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/12) | Cadastro repetitivo de entidades no banco de dados                 | banco, performance | Corrigido |
| [#7](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/7)   | Falta de validação e `required` nos inputs de cadastro/atualização | segurança, bug     | Corrigido |
| [#11](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/11) | Falta de tratamento de nulidade nos dados do imóvel                | bug, backend       | Corrigido |
| [#28](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/28) | Tratamento de erro nas funções CRUD do back-end                    | bug, backend       | Corrigido |
| [#8](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/8)   | Falta de tratamento de erros no envio de dados para o back-end     | bug, frontend      | Corrigido |

### Alta

| Issue                                                                    | Problema                                                 | Área        | Status        |
| ------------------------------------------------------------------------ | -------------------------------------------------------- | ----------- | ------------- |
| [#24](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/24) | Falta de lazy loading no roteamento                      | performance | Corrigido     |
| [#4](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/4)   | Uso de funções obsoletas do `CommonModule` no Angular 22 | frontend    | Corrigido     |
| [#29](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/29) | Falta de classe de testes no back-end e front-end        | arquitetura | Não corrigido |

### Média

| Issue                                                                    | Problema                                        | Área          | Status    |
| ------------------------------------------------------------------------ | ----------------------------------------------- | ------------- | --------- |
| [#41](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/41) | Arquitetura do backend sem separação em camadas | arquitetura   | Corrigido |
| [#30](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/30) | Componentização insuficiente no Angular         | arquitetura   | Corrigido |
| [#10](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/10) | Injeção de campo em vez de construtor no Spring | boas práticas | Corrigido |
| [#3](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/3)   | Falta de semântica no formulário HTML           | frontend      | Corrigido |
| [#5](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/5)   | Falta do atributo `type` nos elementos `button` | frontend      | Corrigido |

### Baixa

| Issue                                                                    | Problema                                  | Área          | Status        |
| ------------------------------------------------------------------------ | ----------------------------------------- | ------------- | ------------- |
| [#6](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/6)   | Uso de `inject()` no lugar do constructor | boas práticas | Corrigido     |
| [#26](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/26) | Falta de página 404                       | frontend      | Corrigido     |
| [#33](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/33) | Reformulação do visual do sistema         | frontend      | Não corrigido |

## Ordem de solução

A ordem seguiu o critério de convenção
de resolver a base antes do comportamento. O trabalho ficou dividido em três blocos.

**1. Estrutura e versionamento.** Refatoração do formulário de cadastro, adição do
Flyway com as migrations ([#27](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/27))
e componentização do frontend ([#30](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/30)).
As migrations vieram primeiro porque, com o schema sendo gerado pelo Hibernate,
qualquer alteração de entidade seria feita sobre uma base sem controle.

**2. Segurança.** Correção do SQL Injection
([#9](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/9)), com o CRUD
reescrito em JPA, seguida das validações de entrada
([#7](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/7)). As duas
fecham a mesma porta por lados diferentes: o JPA impede a injeção, e o Bean
Validation impede que dado inválido chegue ao banco.

**3. Tratamento de erros.** Centralização no `TratadorDeErros`
([#28](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/28)). Ficou por
último porque padronizar a resposta de erro só faz sentido depois de definir o que é
erro, o que veio das validações do bloco anterior.

A arquitetura em camadas
([#41](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/41)) foi feita
depois, já durante a Parte 2, antes da paginação. Separar controller, service e
repository passou a valer a pena quando o backend ganhou a segunda entidade.

## Maiores problemas críticos em detalhes

Importante trazer um pouco sobre cada problema de gravidade crítica.

### SQL Injection ([#9](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/9))

O SQL Injection existia devido a concatenação de uma query sql diretamente com os dados do post, ou seja, era possível o usuário enviar requisições dentro de um input no frontend. Para contornar isso foi usado o JPA, de forma a trazer funções próprias para consultas SQL e permitir segurança nesse caso.

### Schema gerido pelo Hibernate ([#27](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/27))

No projeto, toda a tabela inicial com a seed, estava sendo criado pelo hibernate, não sendo exatamente um problema em protótipo, mas em projetos grandes e escaláveis, isso pode se tornar muito problema, e um deles que já estava acontecendo, era reinserção de dados toda vez que a aplicação subia. No caso, para resolver isso, foi utilizado o Flyway, permitindo uso de migrations no projeto.

## Identificados e não corrigidos

Registro consciente de problemas não corrigidos.

### [#29](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/29) — Falta de testes automatizados (alta)

Foi mais por escolha de escopo e organização de tempo, onde caso houvesse possibilidade, seria realizado as função de testes unitários para cada módulo, com o fim de manter o projeto com boas práticas e estrutura sólida, mas não afeta no funcionamento em si do sistema.

### [#33](https://github.com/MatheusVictorMartins/desafio-tecnico/issues/33) — Reformulação do visual (baixa)

Foi também por escolha de escopo, onde foi percebido uma possível melhora, mas que levaria tempo realizando escolha de identidade visual, cores, tipografia, etc. Então foi optado por seguir pelas tarefas mais importantes.
