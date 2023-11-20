import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LotesDeCompraData,
  LotesDeCompraRequest,
  LotesDeCompraResponse,
} from 'src/app/interfaces';
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

  public listPerPage(
    page: number,
    search?: string
  ): Observable<LotesDeCompraResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/lotesdecompra/page/${page}`;

    if (search) {
      const params = new HttpParams().set('search', search);
      url += `?${params.toString()}`;
    }

    return this.http.get<LotesDeCompraResponse>(url, { headers });
  }

  public listAll(): Observable<LotesDeCompraData[]> {
    const headers = this.getHeaders();
    return this.http.get<LotesDeCompraData[]>(
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

  public edit(
    body: LotesDeCompraRequest,
    id: number
  ): Observable<LotesDeCompraRequest> {
    const headers = this.getHeaders();
    return this.http.put<LotesDeCompraRequest>(
      `${environment.apiUrl}/lotesdecompra/${id}`,
      body,
      { headers }
    );
  }
}
