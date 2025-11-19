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
    console.log('GET', this.base);
    return this.http.get<Plano[]>(this.base);
  }

  get(id: number): Observable<Plano> {
    console.log('GET', `${this.base}/${id}`);
    return this.http.get<Plano>(`${this.base}/${id}`);
  }

  create(plano: Omit<Plano, 'id'>): Observable<Plano> {
    console.log('POST', this.base, plano);
    return this.http.post<Plano>(this.base, plano);
  }

  update(id: number, plano: Partial<Plano>): Observable<Plano> {
    console.log('PUT', `${this.base}/${id}`, plano);
    return this.http.put<Plano>(`${this.base}/${id}`, plano);
  }

  delete(id: number): Observable<void> {
    console.log('DELETE', `${this.base}/${id}`);
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}