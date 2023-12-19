import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersValue, ListagemResponse } from 'src/app/interfaces';
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

  public listPerPageFiltered(
    page: number,
    filtersValue: FiltersValue
  ): Observable<ListagemResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/tiposdereagente/page/${page}/filtered?`;

    if (filtersValue.search) {
      const params = new HttpParams().set('search', filtersValue.search);
      url += `${params.toString()}&`;
    }
    
    if (filtersValue.un) {
      const params = new HttpParams().set('unmedida', filtersValue.un);
      url += `${params.toString()}&`;
    }
    
    if (filtersValue.tag) {
      const params = new HttpParams().set('tag', filtersValue.tag);
      url += `${params.toString()}&`;
    }
    
    if (filtersValue.qtdMin) {
      const params = new HttpParams().set('qtdMin', filtersValue.qtdMin);
      url += `${params.toString()}&`;
    }
        
    if (filtersValue.qtdMax) {
      const params = new HttpParams().set('qtdMax', filtersValue.qtdMax);
      url += `${params.toString()}&`;
    }
    
    if (filtersValue.vlrUnitMin) {
      const params = new HttpParams().set('vlrUnitMin', filtersValue.vlrUnitMin);
      url += `${params.toString()}&`;
    }
        
    if (filtersValue.vlrUnitMax) {
      const params = new HttpParams().set('vlrUnitMax', filtersValue.vlrUnitMax);
      url += `${params.toString()}&`;
    }
    
    if (filtersValue.vlrTotMin) {
      const params = new HttpParams().set('vlrTotMin', filtersValue.vlrTotMin);
      url += `${params.toString()}&`;
    }
        
    if (filtersValue.vlrTotMax) {
      const params = new HttpParams().set('vlrTotMax', filtersValue.vlrTotMax);
      url += `${params.toString()}&`;
    }
            
    if (filtersValue.loc) {
      const params = new HttpParams().set('loc', filtersValue.loc);
      url += `${params.toString()}&`;
    }

    return this.http.get<ListagemResponse>(url, { headers });
  }
}
