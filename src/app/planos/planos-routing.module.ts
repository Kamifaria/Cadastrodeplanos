import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanosListComponent } from './components/planos-list/planos-list.component';
import { PlanoFormComponent } from './components/plano-form/plano-form.component';

const routes: Routes = [
  { path: '', component: PlanosListComponent },
  { path: 'novo', component: PlanoFormComponent },
  { path: 'editar/:id', component: PlanoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosRoutingModule {}