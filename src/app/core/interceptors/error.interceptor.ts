import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const ts = inject(ToastService);
  return next(req).pipe(
    catchError((err) => {
      const status = err?.status ?? 0;
      let message = 'Falha na comunicação com a API';
      if (status === 0) message = 'Sem conexão com o servidor';
      else if (status >= 500) message = 'Erro interno no servidor';
      else if (status === 404) message = 'Recurso não encontrado';
      else if (status === 400) message = 'Requisição inválida';
      ts.show(message, 'error');
      return throwError(() => err);
    })
  );
};