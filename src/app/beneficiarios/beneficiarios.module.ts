import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiariosRoutingModule } from './beneficiarios-routing.module';
import { BeneficiariosListComponent } from './components/beneficiarios-list/beneficiarios-list.component';
import { BeneficiarioFormComponent } from './components/beneficiario-form/beneficiario-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BeneficiariosRoutingModule, BeneficiariosListComponent, BeneficiarioFormComponent]
})
export class BeneficiariosModule {}