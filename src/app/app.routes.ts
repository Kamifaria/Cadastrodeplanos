import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'planos',
    loadChildren: () => import('./planos/planos.module').then(m => m.PlanosModule)
  },
  {
    path: 'beneficiarios',
    loadChildren: () => import('./beneficiarios/beneficiarios.module').then(m => m.BeneficiariosModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
