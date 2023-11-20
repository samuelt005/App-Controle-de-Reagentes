import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public listPerPage(page: number): Observable<SolicitacoesResponse> {
    const headers = this.getHeaders();
    return this.http.get<SolicitacoesResponse>(
      `${environment.apiUrl}/solicitacoes/page/${page}`,
      { headers }
    );
  }

  public updateStatus(
    id: number,
    status: number
  ): Observable<unknown> {
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
