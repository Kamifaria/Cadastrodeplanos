import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiarioService } from '../../../core/services/beneficiario.service';
import { PlanoService } from '../../../core/services/plano.service';
import { Plano } from '../../../core/models/plano';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: ['./beneficiario-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class BeneficiarioFormComponent {
  form: FormGroup;
  planos: Plano[] = [];

  constructor(fb: FormBuilder, private service: BeneficiarioService, private planoService: PlanoService, private router: Router) {
    this.form = fb.group({
      nome_completo: ['', Validators.required],
      cpf: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      plano_id: [null, Validators.required]
    });
    this.planoService.list().subscribe((data) => (this.planos = data));
  }

  salvar(): void {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((c) => c.markAsTouched());
      return;
    }
    const payload = this.form.value;
    this.service.create(payload).subscribe(() => {
      this.router.navigate(['/beneficiarios']);
    });
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}