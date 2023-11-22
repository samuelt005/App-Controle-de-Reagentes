import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';
import { darBaixaRequest } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DarBaixaService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public addNew(
    id: number,
    body: darBaixaRequest
  ): Observable<darBaixaRequest> {
    const headers = this.getHeaders();
    return this.http.post<darBaixaRequest>(
      `${environment.apiUrl}/movimentacao/baixa/${id}`,
      body,
      { headers }
    );
  }
}
