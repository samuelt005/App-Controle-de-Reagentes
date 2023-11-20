import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListagemResponse } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ListagemService {
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
  ): Observable<ListagemResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/tiposdereagente/page/${page}/active`;

    if (search) {
      const params = new HttpParams().set('search', search);
      url += `?${params.toString()}`;
    }

    return this.http.get<ListagemResponse>(url, { headers });
  }
}
