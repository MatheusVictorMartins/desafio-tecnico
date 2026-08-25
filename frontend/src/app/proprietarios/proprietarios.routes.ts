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
