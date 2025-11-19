import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanoService } from '../../../core/services/plano.service';
import { Plano } from '../../../core/models/plano';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-planos-list',
  templateUrl: './planos-list.component.html',
  styleUrls: ['./planos-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PlanosListComponent implements OnInit {
  planos: Plano[] = [];

  constructor(private service: PlanoService, private ts: ToastService) {}

  ngOnInit(): void {
    this.service.list().subscribe((data) => (this.planos = data));
  }

  remover(id: number): void {
    const alvo = this.planos.find((p) => p.id === id);
    this.service.delete(id).subscribe(() => {
      this.planos = this.planos.filter((p) => p.id !== id);
      const nome = alvo?.nome ?? 'Plano';
      this.ts.show(`${nome} excluído`, 'success');
    });
  }
}