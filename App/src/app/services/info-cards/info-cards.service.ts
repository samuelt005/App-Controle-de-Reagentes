import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoCardsService {
  constructor(private http: HttpClient) {}

  getItemsSum(table: string, column: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/items/sum/${table}/${column}`
    );
  }

  getActiveTypesCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/tiposdereagente/count/actives'
    );
  }

  getMostUsedCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/tiposdereagente/find/mostused'
    );
  }
}
