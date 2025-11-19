import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanoService } from '../../../core/services/plano.service';
import { Plano } from '../../../core/models/plano';
import { ToastService } from '../../../core/services/toast.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-planos-list',
  templateUrl: './planos-list.component.html',
  styleUrls: ['./planos-list.component.scss'],
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
export class PlanosListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'codigo_registro_ans', 'acoes'];
  data = new MatTableDataSource<Plano>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PlanoService, private ts: ToastService) {}

  ngOnInit(): void {
    this.service.list().subscribe((arr) => {
      this.data.data = arr;
      if (this.paginator) this.data.paginator = this.paginator;
      if (this.sort) this.data.sort = this.sort;
    });
  }

  remover(id: number): void {
    const alvo = this.data.data.find((p) => p.id === id);
    this.service.delete(id).subscribe(() => {
      this.data.data = this.data.data.filter((p) => p.id !== id);
      const nome = alvo?.nome ?? 'Plano';
      this.ts.show(`${nome} excluído`, 'success');
    });
  }

  applyFilter(value: string): void {
    this.data.filter = value.trim().toLowerCase();
  }
}