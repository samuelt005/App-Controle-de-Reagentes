import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier, SuppliersData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';

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
      `http://localhost:3000/fornecedores/page/${page}`,
      { headers }
    );
  }

  listAll(): Observable<SuppliersData> {
    const headers = this.getHeaders();
    return this.http.get<SuppliersData>(`http://localhost:3000/fornecedores`, {
      headers,
    });
  }

  addNew(body: Supplier): Observable<Supplier> {
    const headers = this.getHeaders();
    return this.http.post<Supplier>(
      `http://localhost:3000/fornecedores`,
      body,
      { headers }
    );
  }

  edit(body: Supplier, id: number): Observable<Supplier> {
    const headers = this.getHeaders();
    return this.http.put<Supplier>(
      `http://localhost:3000/fornecedores/${id}`,
      body,
      { headers }
    );
  }
}
