import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FornecedoresRequest, FornecedoresResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listPerPage(page: number): Observable<FornecedoresResponse> {
    const headers = this.getHeaders();
    return this.http.get<FornecedoresResponse>(
      `${environment.apiUrl}/fornecedores/page/${page}`,
      { headers }
    );
  }

  public listAll(): Observable<FornecedoresResponse> {
    const headers = this.getHeaders();
    return this.http.get<FornecedoresResponse>(`${environment.apiUrl}/fornecedores`, {
      headers,
    });
  }

  public addNew(body: FornecedoresRequest): Observable<FornecedoresRequest> {
    const headers = this.getHeaders();
    return this.http.post<FornecedoresRequest>(
      `${environment.apiUrl}/fornecedores`,
      body,
      { headers }
    );
  }

  public edit(body: FornecedoresRequest, id: number): Observable<FornecedoresRequest> {
    const headers = this.getHeaders();
    return this.http.put<FornecedoresRequest>(
      `${environment.apiUrl}/fornecedores/${id}`,
      body,
      { headers }
    );
  }
}
