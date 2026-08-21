import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./imoveis/imoveis').then((m) => m.Imoveis) },
  { path: 'imoveis', loadComponent: () => import('./imoveis/imoveis').then((m) => m.Imoveis) },
  { path: '**', loadComponent: () => import('./imoveis/imoveis').then((m) => m.Imoveis) },
];
