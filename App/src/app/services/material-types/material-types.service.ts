import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingData, Type } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaterialTypesService {
  constructor(private http: HttpClient) {}

  headers = {
    'content-type': 'application/json',
    Authorization: 'TOKEN',
  };

  listPerPage(page: number): Observable<ListingData> {
    return this.http.get<ListingData>(
      `http://localhost:3000/tiposdereagente/page/${page}`
    );
  }

  listAll(): Observable<ListingData> {
    return this.http.get<ListingData>(
      `http://localhost:3000/tiposdereagente/active`
    );
  }

  updateActive(id: number): Observable<unknown> {
    const body = {};
    return this.http.put<unknown>(
      `http://localhost:3000/tiposdereagente/${id}/ativo`,
      body
    );
  }

  addNew(body: Type): Observable<Type> {
    return this.http.post<Type>(`http://localhost:3000/tiposdereagente`, body);
  }

  edit(body: Type, id: number): Observable<Type> {
    return this.http.put<Type>(
      `http://localhost:3000/tiposdereagente/${id}`,
      body
    );
  }

  updateTags(body: any, id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/tags/${id}`, body);
  }
}
