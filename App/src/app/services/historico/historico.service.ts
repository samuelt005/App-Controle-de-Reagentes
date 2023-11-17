import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricosRequest, HistoricosResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listPerPage(page: number, id: number): Observable<HistoricosResponse> {
    const headers = this.getHeaders();
    return this.http.get<HistoricosResponse>(
      `${environment.apiUrl}/historico/item/${id}/page/${page}`,
      { headers }
    );
  }

  public addNew(
    id: number,
    body: HistoricosRequest
  ): Observable<HistoricosRequest> {
    const headers = this.getHeaders();
    return this.http.post<HistoricosRequest>(
      `${environment.apiUrl}/historico/item/${id}`,
      body,
      { headers }
    );
  }
}
