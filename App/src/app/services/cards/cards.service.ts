import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HistoricosPageData,
  ListagemPageData,
  SolicitacaoPageData,
} from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public getListagemData(): Observable<ListagemPageData> {
    const headers = this.getHeaders();
    return this.http.get<ListagemPageData>(
      `${environment.apiUrl}/cards/listagem`,
      { headers }
    );
  }

  public getHistoricoData(id: number): Observable<HistoricosPageData> {
    const headers = this.getHeaders();
    return this.http.get<HistoricosPageData>(
      `${environment.apiUrl}/cards/historico/${id}`,
      { headers }
    );
  }

  public getSolicitacaoData(id: number): Observable<SolicitacaoPageData> {
    const headers = this.getHeaders();
    return this.http.get<SolicitacaoPageData>(
      `${environment.apiUrl}/cards/solicitacao/${id}`,
      { headers }
    );
  }
}
