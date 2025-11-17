import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanosRoutingModule } from './planos-routing.module';
import { PlanosListComponent } from './components/planos-list/planos-list.component';
import { PlanoFormComponent } from './components/plano-form/plano-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PlanosRoutingModule, PlanosListComponent, PlanoFormComponent]
})
export class PlanosModule {}