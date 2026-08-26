// Haverá esses arquivos de rotas separados do principal: app.routes.ts
// Foi feito pra organização e garantir que as rotas estejam corretas com lazy loading

import { Routes } from '@angular/router';

export const proprietariosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listagem-proprietarios/listagem-proprietarios').then(
        (m) => m.ListagemProprietarios,
      ),
  },
  {
    path: ':id/imoveis',
    loadComponent: () =>
      import('./pages/imoveis-do-proprietario/imoveis-do-proprietario').then(
        (m) => m.ImoveisDoProprietario,
      ),
  },
];
