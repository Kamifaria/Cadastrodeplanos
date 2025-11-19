import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiarioService } from '../../../core/services/beneficiario.service';
import { PlanoService } from '../../../core/services/plano.service';
import { Plano } from '../../../core/models/plano';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiario-form',
  templateUrl: './beneficiario-form.component.html',
  styleUrls: ['./beneficiario-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class BeneficiarioFormComponent implements OnInit {
  form: FormGroup;
  planos: Plano[] = [];
  id?: number;
  isEdit = false;

  constructor(
    fb: FormBuilder,
    private service: BeneficiarioService,
    private planoService: PlanoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      nome_completo: ['', Validators.required],
      cpf: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      plano_id: [null, Validators.required]
    });
    this.planoService.list().subscribe((data) => (this.planos = data));
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.service.get(this.id).subscribe((b) => {
        this.form.patchValue({
          nome_completo: b.nome_completo,
          cpf: b.cpf,
          data_nascimento: b.data_nascimento,
          status: b.status,
          plano_id: b.plano_id
        });
      });
    }
  }

  salvar(): void {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((c) => c.markAsTouched());
      return;
    }
    const payload = this.form.value;
    if (this.isEdit && this.id) {
      console.log('UPDATE beneficiario', this.id, payload);
      this.service.update(this.id, payload).subscribe(() => {
        this.router.navigate(['/beneficiarios']);
        this.form.markAsPristine();
      });
    } else {
      console.log('CREATE beneficiario', payload);
      this.service.create(payload).subscribe(() => {
        this.router.navigate(['/beneficiarios']);
        this.form.reset({ status: 'ATIVO' });
      });
    }
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}