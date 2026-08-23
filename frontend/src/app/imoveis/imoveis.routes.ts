import { Routes } from '@angular/router';

export const imoveisRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listagem-imoveis/listagem-imoveis').then((m) => m.ListagemImoveis),
  },
];
