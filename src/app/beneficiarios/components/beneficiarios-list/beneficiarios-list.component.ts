import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BeneficiarioService } from '../../../core/services/beneficiario.service';
import { Beneficiario } from '../../../core/models/beneficiario';
import { Plano } from '../../../core/models/plano';
import { ToastService } from '../../../core/services/toast.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-beneficiarios-list',
  templateUrl: './beneficiarios-list.component.html',
  styleUrls: ['./beneficiarios-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class BeneficiariosListComponent implements OnInit {
  displayedColumns: string[] = ['nome_completo', 'cpf', 'plano', 'status', 'acoes'];
  data = new MatTableDataSource<Array<Beneficiario & { plano: Plano }> extends infer T ? (T extends Array<infer U> ? U : never) : never>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: BeneficiarioService, private ts: ToastService) {}

  ngOnInit(): void {
    this.service.listExpanded().subscribe((arr) => {
      this.data.data = arr as any;
      if (this.paginator) this.data.paginator = this.paginator;
      if (this.sort) this.data.sort = this.sort;
    });
  }

  remover(id: number): void {
    const alvo = this.data.data.find((b: any) => b.id === id) as any;
    this.service.delete(id).subscribe(() => {
      this.data.data = this.data.data.filter((b: any) => b.id !== id) as any;
      const nome = alvo?.nome_completo ?? 'Beneficiário';
      this.ts.show(`${nome} excluído`, 'success');
    });
  }

  applyFilter(value: string): void {
    this.data.filter = value.trim().toLowerCase();
  }
}