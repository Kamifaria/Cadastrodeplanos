import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BeneficiarioService } from '../../../core/services/beneficiario.service';
import { Beneficiario } from '../../../core/models/beneficiario';
import { Plano } from '../../../core/models/plano';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-beneficiarios-list',
  templateUrl: './beneficiarios-list.component.html',
  styleUrls: ['./beneficiarios-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BeneficiariosListComponent implements OnInit {
  beneficiarios: Array<Beneficiario & { plano: Plano }> = [];

  constructor(private service: BeneficiarioService, private ts: ToastService) {}

  ngOnInit(): void {
    this.service.listExpanded().subscribe((data) => (this.beneficiarios = data));
  }

  remover(id: number): void {
    const alvo = this.beneficiarios.find((b) => b.id === id);
    this.service.delete(id).subscribe(() => {
      this.beneficiarios = this.beneficiarios.filter((b) => b.id !== id);
      const nome = alvo?.nome_completo ?? 'Beneficiário';
      this.ts.show(`${nome} excluído`, 'success');
    });
  }
}