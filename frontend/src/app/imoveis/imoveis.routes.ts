import { Routes } from '@angular/router';

export const imoveisRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listagem-imoveis/listagem-imoveis').then((m) => m.ListagemImoveis),
  },
  {
    path: 'cadastra_imoveis',
    loadComponent: () =>
      import('./pages/cadastra-imoveis/cadastra-imoveis').then((m) => m.CadastraImoveis),
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./pages/edita-imoveis/edita-imoveis').then((m) => m.EditaImoveis),
  },
];
