import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'imoveis' },
  {
    path: 'imoveis',
    loadChildren: () => import('./imoveis/imoveis.routes').then((m) => m.imoveisRoutes),
  },
  { path: '**', redirectTo: 'imoveis' },
];
