import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier, SuppliersData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  listPerPage(page: number): Observable<SuppliersData> {
    const headers = this.getHeaders();
    return this.http.get<SuppliersData>(
      `${environment.apiUrl}/fornecedores/page/${page}`,
      { headers }
    );
  }

  listAll(): Observable<SuppliersData> {
    const headers = this.getHeaders();
    return this.http.get<SuppliersData>(`${environment.apiUrl}/fornecedores`, {
      headers,
    });
  }

  addNew(body: Supplier): Observable<Supplier> {
    const headers = this.getHeaders();
    return this.http.post<Supplier>(
      `${environment.apiUrl}/fornecedores`,
      body,
      { headers }
    );
  }

  edit(body: Supplier, id: number): Observable<Supplier> {
    const headers = this.getHeaders();
    return this.http.put<Supplier>(
      `${environment.apiUrl}/fornecedores/${id}`,
      body,
      { headers }
    );
  }
}
