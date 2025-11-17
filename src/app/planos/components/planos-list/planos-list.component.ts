import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planos-list',
  templateUrl: './planos-list.component.html',
  styleUrls: ['./planos-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PlanosListComponent {}