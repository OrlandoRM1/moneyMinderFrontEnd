import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Gasto } from './gastos/Gasto';
import { LoginResponse } from './loguin/LoginResponse';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { user, password };

    return this.http.post<any>(`${this.apiUrl}/loguin/authenticate`, body, { headers });
  }

  loginAnt(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/loguin/loginAntiDirectory`;
    const body = { username, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      map(response => {
        if (response.exist) {
          localStorage.setItem('token', response.token);
          this.setAuthStatus(true);
        } else {
          this.setAuthStatus(false);
          return response;
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Error desconocido';
        if (error.status === 401) {
          errorMsg = 'Credenciales inválidas';
        } else {
          errorMsg = error.error.message || 'Error en el servidor';
        }
        return throwError(errorMsg);
      })
    );
  }

  createGasto(gasto: Gasto): Observable<Gasto> {
    const url = `${this.apiUrl}/Gast/createGasto`;
    return this.http.post<Gasto>(url, gasto).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Error desconocido';
        if (error.status === 401) {
          errorMsg = 'No autorizado';
        } else {
          errorMsg = error.error.message || 'Error en el servidor';
        }
        return throwError(errorMsg);
      })
    );
  }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/Gast/getAllGastos`);
  }

  setAuthStatus(status: boolean): void {
    this.isAuthenticated = status;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
