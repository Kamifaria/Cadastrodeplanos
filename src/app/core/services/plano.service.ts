import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Plano } from '../models/plano';

@Injectable({ providedIn: 'root' })
export class PlanoService {
  private base = `${API_URL}/planos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.base);
  }

  get(id: number): Observable<Plano> {
    return this.http.get<Plano>(`${this.base}/${id}`);
  }

  create(plano: Omit<Plano, 'id'>): Observable<Plano> {
    return this.http.post<Plano>(this.base, plano);
  }

  update(id: number, plano: Partial<Plano>): Observable<Plano> {
    return this.http.put<Plano>(`${this.base}/${id}`, plano);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}