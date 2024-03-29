import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosRequest, UsuariosResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
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
  ): Observable<UsuariosResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/usuarios/page/${page}`;

    if (search) {
      const params = new HttpParams().set('search', search);
      url += `?${params.toString()}`;
    }

    return this.http.get<UsuariosResponse>(url, { headers });
  }

  public addNew(body: UsuariosRequest): Observable<UsuariosRequest> {
    const headers = this.getHeaders();
    return this.http.post<UsuariosRequest>(
      `${environment.apiUrl}/usuarios`,
      body,
      {
        headers,
      }
    );
  }

  public edit(body: UsuariosRequest, id: string): Observable<UsuariosRequest> {
    const headers = this.getHeaders();
    return this.http.put<UsuariosRequest>(
      `${environment.apiUrl}/usuarios/${id}/atualizar`,
      body,
      {
        headers,
      }
    );
  }
}
