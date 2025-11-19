import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'planos',
    loadChildren: () => import('./planos/planos.module').then(m => m.PlanosModule)
  },
  {
    path: 'beneficiarios',
    loadChildren: () => import('./beneficiarios/beneficiarios.module').then(m => m.BeneficiariosModule)
  },
  { path: '', redirectTo: 'planos', pathMatch: 'full' }
];
