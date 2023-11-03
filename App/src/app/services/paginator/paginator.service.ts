import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor(private http: HttpClient) {}

  getItemsCount(table: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/items/count/${table}`);
  }

  getActiveTypesCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/tiposdereagente/count/actives'
    );
  }
}
