import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from './gastos/Gasto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user, password };

    return this.http.post<any>(`${this.apiUrl}/loguin/authenticate`, body, { headers });
  }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/Gast/getAllGastos`);
  }
}
