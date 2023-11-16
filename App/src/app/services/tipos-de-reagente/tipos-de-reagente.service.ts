import { TokenService } from 'src/app/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListagemResponse, TiposDeReagenteRequest } from 'src/app/interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TiposDeReagenteService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public listPerPage(page: number): Observable<ListagemResponse> {
    const headers = this.getHeaders();
    return this.http.get<ListagemResponse>(
      `${environment.apiUrl}/tiposdereagente/page/${page}`,
      { headers }
    );
  }

  public listAll(): Observable<ListagemResponse> {
    const headers = this.getHeaders();
    return this.http.get<ListagemResponse>(
      `${environment.apiUrl}/tiposdereagente/active`,
      { headers }
    );
  }

  public updateActive(id: number): Observable<unknown> {
    const headers = this.getHeaders();
    const body = {};
    return this.http.put<unknown>(
      `${environment.apiUrl}/tiposdereagente/${id}/ativo`,
      body,
      { headers }
    );
  }

  public addNew(body: TiposDeReagenteRequest): Observable<TiposDeReagenteRequest> {
    const headers = this.getHeaders();
    return this.http.post<TiposDeReagenteRequest>(`${environment.apiUrl}/tiposdereagente`, body, {
      headers,
    });
  }

  public edit(body: TiposDeReagenteRequest, id: number): Observable<TiposDeReagenteRequest> {
    const headers = this.getHeaders();
    return this.http.put<TiposDeReagenteRequest>(
      `${environment.apiUrl}/tiposdereagente/${id}`,
      body,
      { headers }
    );
  }

  public updateTags(body: unknown, id: number): Observable<unknown> {
    const headers = this.getHeaders();
    return this.http.put<unknown>(`${environment.apiUrl}/tags/${id}`, body, {
      headers,
    });
  }
}
