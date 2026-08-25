import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'imoveis' },
  {
    path: 'imoveis',
    loadChildren: () => import('./imoveis/imoveis.routes').then((m) => m.imoveisRoutes),
  },
  {
    path: 'proprietarios',
    loadChildren: () =>
      import('./proprietarios/proprietarios.routes').then((m) => m.proprietariosRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/nao-encontrado/nao-encontrado').then((m) => m.NaoEncontrado),
  },
];
