import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitacoesResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SolicitacoesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listPerPage(
    page: number,
    search?: string
  ): Observable<SolicitacoesResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/solicitacoes/page/${page}`;

    if (search) {
      const params = new HttpParams().set('search', search);
      url += `?${params.toString()}`;
    }

    return this.http.get<SolicitacoesResponse>(url, { headers });
  }

  public updateStatus(id: number, status: number): Observable<unknown> {
    const headers = this.getHeaders();
    const body = {
      status,
    };
    return this.http.put<unknown>(
      `${environment.apiUrl}/Solicitacoes/${id}`,
      body,
      { headers }
    );
  }
}
