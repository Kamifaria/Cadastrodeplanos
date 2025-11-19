import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlanoService } from '../../../core/services/plano.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-plano-form',
  templateUrl: './plano-form.component.html',
  styleUrls: ['./plano-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PlanoFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    fb: FormBuilder,
    private service: PlanoService,
    private router: Router,
    private route: ActivatedRoute,
    private ts: ToastService
  ) {
    this.form = fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigo_registro_ans: ['', [Validators.required, Validators.pattern(/^ANS-\d{6}$/)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.service.get(this.id).subscribe((plano) => {
        this.form.patchValue({
          nome: plano.nome,
          codigo_registro_ans: plano.codigo_registro_ans
        });
      });
    }
  }

  salvar(): void {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((c) => c.markAsTouched());
      return;
    }
    if (this.isEdit && this.id) {
      this.service.update(this.id, this.form.value).subscribe((plano) => {
        const nome = plano?.nome ?? this.form.value.nome;
        this.ts.show(`${nome} atualizado`, 'success');
        this.router.navigate(['/planos']);
      });
    } else {
      this.service.create(this.form.value).subscribe((plano) => {
        const nome = plano?.nome ?? this.form.value.nome;
        this.ts.show(`${nome} criado`, 'success');
        this.router.navigate(['/planos']);
      });
    }
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
}