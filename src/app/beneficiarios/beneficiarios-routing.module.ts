import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiariosListComponent } from './components/beneficiarios-list/beneficiarios-list.component';
import { BeneficiarioFormComponent } from './components/beneficiario-form/beneficiario-form.component';

const routes: Routes = [
  { path: '', component: BeneficiariosListComponent },
  { path: 'novo', component: BeneficiarioFormComponent },
  { path: 'editar/:id', component: BeneficiarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiariosRoutingModule {}