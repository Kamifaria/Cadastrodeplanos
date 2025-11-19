import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Beneficiario } from '../models/beneficiario';
import { Plano } from '../models/plano';

type BeneficiarioExpanded = Beneficiario & { plano: Plano };

@Injectable({ providedIn: 'root' })
export class BeneficiarioService {
  private base = `${API_URL}/beneficiarios`;

  constructor(private http: HttpClient) {}

  list(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.base);
  }

  listExpanded(): Observable<BeneficiarioExpanded[]> {
    return this.http.get<BeneficiarioExpanded[]>(`${this.base}?_expand=plano`);
  }

  get(id: number): Observable<Beneficiario> {
    return this.http.get<Beneficiario>(`${this.base}/${id}`);
  }

  create(b: Omit<Beneficiario, 'id' | 'data_cadastro'>): Observable<Beneficiario> {
    const payload = { ...b, data_cadastro: new Date().toISOString() };
    return this.http.post<Beneficiario>(this.base, payload);
  }

  update(id: number, b: Partial<Beneficiario>): Observable<Beneficiario> {
    return this.http.put<Beneficiario>(`${this.base}/${id}`, b);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}