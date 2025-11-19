import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanoService } from '../../../core/services/plano.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plano-form',
  templateUrl: './plano-form.component.html',
  styleUrls: ['./plano-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PlanoFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private service: PlanoService, private router: Router) {
    this.form = fb.group({
      nome: ['', Validators.required],
      codigo_registro_ans: ['', Validators.required]
    });
  }

  salvar(): void {
    if (!this.form.valid) return;
    this.service.create(this.form.value).subscribe(() => {
      this.router.navigate(['/planos']);
    });
  }
}