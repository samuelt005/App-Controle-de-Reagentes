import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TokenService } from '../token/token.service';
import { solicitacaoRequest } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SolicitarService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public addNewSolicitacao(
    comentario: string | null | undefined,
    id_usuario: string
  ): Observable<number> {
    const body = {
      comentario,
      id_usuario,
    };
    const headers = this.getHeaders();
    return this.http.post<number>(`${environment.apiUrl}/solicitacoes`, body, {
      headers,
    });
  }

  public addNewItem(
    id: number,
    body: solicitacaoRequest
  ): Observable<solicitacaoRequest> {
    const headers = this.getHeaders();
    return this.http.post<solicitacaoRequest>(
      `${environment.apiUrl}/movimentacao/solicitacao/${id}`,
      body,
      { headers }
    );
  }
}
