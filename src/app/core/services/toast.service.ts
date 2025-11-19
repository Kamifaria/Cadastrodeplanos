import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ToastType = 'info' | 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private subject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.subject.asObservable();

  show(message: string, type: ToastType = 'info', durationMs = 4000): void {
    const id = Date.now() + Math.random();
    const next = [...this.subject.value, { id, message, type }];
    this.subject.next(next);
    setTimeout(() => this.remove(id), durationMs);
  }

  remove(id: number): void {
    this.subject.next(this.subject.value.filter((t) => t.id !== id));
  }
}