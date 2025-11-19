import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cadastrodeplanos';
  toasts$!: Observable<any>;
  constructor(private ts: ToastService) {
    this.toasts$ = ts.toasts$;
  }
  closeToast(id: number): void {
    this.ts.remove(id);
  }
}
