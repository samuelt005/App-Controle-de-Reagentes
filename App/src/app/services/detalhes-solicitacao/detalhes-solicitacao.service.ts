import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemSolicitacao, ItemSolicitacaoRequest } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DetalhesSolicitacaoService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listItems(id: number): Observable<ItemSolicitacao[]> {
    const headers = this.getHeaders();
    return this.http.get<ItemSolicitacao[]>(
      `${environment.apiUrl}/solicitacao/${id}`,
      { headers }
    );
  }

  public updateItem(id: number, body: ItemSolicitacaoRequest): Observable<ItemSolicitacaoRequest> {
    const headers = this.getHeaders();
    return this.http.put<ItemSolicitacaoRequest>(
      `${environment.apiUrl}/solicitacao/item/${id}`,
      body,
      { headers }
    );
  }
}
