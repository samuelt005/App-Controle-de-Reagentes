import { TokenService } from 'src/app/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingData, Type } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaterialTypesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  listPerPage(page: number): Observable<ListingData> {
    const headers = this.getHeaders();
    return this.http.get<ListingData>(
      `http://localhost:3000/tiposdereagente/page/${page}`,
      { headers }
    );
  }

  listAll(): Observable<ListingData> {
    const headers = this.getHeaders();
    return this.http.get<ListingData>(
      `http://localhost:3000/tiposdereagente/active`,
      { headers }
    );
  }

  updateActive(id: number): Observable<unknown> {
    const headers = this.getHeaders();
    const body = {};
    return this.http.put<unknown>(
      `http://localhost:3000/tiposdereagente/${id}/ativo`,
      body,
      { headers }
    );
  }

  addNew(body: Type): Observable<Type> {
    const headers = this.getHeaders();
    return this.http.post<Type>(`http://localhost:3000/tiposdereagente`, body, {
      headers,
    });
  }

  edit(body: Type, id: number): Observable<Type> {
    const headers = this.getHeaders();
    return this.http.put<Type>(
      `http://localhost:3000/tiposdereagente/${id}`,
      body,
      { headers }
    );
  }

  updateTags(body: any, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`http://localhost:3000/tags/${id}`, body, {
      headers,
    });
  }
}
