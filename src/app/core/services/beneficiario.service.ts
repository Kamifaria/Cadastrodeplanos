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
    console.log('GET', this.base);
    return this.http.get<Beneficiario[]>(this.base);
  }

  listExpanded(): Observable<BeneficiarioExpanded[]> {
    console.log('GET', `${this.base}?_expand=plano`);
    return this.http.get<BeneficiarioExpanded[]>(`${this.base}?_expand=plano`);
  }

  get(id: number): Observable<Beneficiario> {
    console.log('GET', `${this.base}/${id}`);
    return this.http.get<Beneficiario>(`${this.base}/${id}`);
  }

  create(b: Omit<Beneficiario, 'id' | 'data_cadastro'>): Observable<Beneficiario> {
    const payload = { ...b, data_cadastro: new Date().toISOString() };
    console.log('POST', this.base, payload);
    return this.http.post<Beneficiario>(this.base, payload);
  }

  update(id: number, b: Partial<Beneficiario>): Observable<Beneficiario> {
    console.log('PUT', `${this.base}/${id}`, b);
    return this.http.put<Beneficiario>(`${this.base}/${id}`, b);
  }

  delete(id: number): Observable<void> {
    console.log('DELETE', `${this.base}/${id}`);
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}