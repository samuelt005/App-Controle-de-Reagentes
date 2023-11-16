import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LotesDeCompraRequest, LotesDeCompraResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LotesDeCompraService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listPerPage(page: number): Observable<LotesDeCompraResponse> {
    const headers = this.getHeaders();
    return this.http.get<LotesDeCompraResponse>(
      `${environment.apiUrl}/lotesdecompra/page/${page}`,
      { headers }
    );
  }

  public listAll(): Observable<LotesDeCompraResponse> {
    const headers = this.getHeaders();
    return this.http.get<LotesDeCompraResponse>(
      `${environment.apiUrl}/lotesdecompra`,
      { headers }
    );
  }

  public addNew(body: LotesDeCompraRequest): Observable<LotesDeCompraRequest> {
    const headers = this.getHeaders();
    return this.http.post<LotesDeCompraRequest>(
      `${environment.apiUrl}/lotesdecompra`,
      body,
      { headers }
    );
  }

  public edit(body: LotesDeCompraRequest, id: number): Observable<LotesDeCompraRequest> {
    const headers = this.getHeaders();
    return this.http.put<LotesDeCompraRequest>(
      `${environment.apiUrl}/lotesdecompra/${id}`,
      body,
      { headers }
    );
  }
}
