import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoCard } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InfoCardsService {
  constructor(private http: HttpClient) {}

  getItemsSum(table: string, column: string): Observable<InfoCard> {
    return this.http.get<InfoCard>(
      `http://localhost:3000/items/sum/${table}/${column}`
    );
  }

  getActiveTypesCount(): Observable<InfoCard> {
    return this.http.get<InfoCard>(
      'http://localhost:3000/tiposdereagente/count/actives'
    );
  }

  getMostUsedCount(): Observable<InfoCard> {
    return this.http.get<InfoCard>(
      'http://localhost:3000/tiposdereagente/find/mostused'
    );
  }
}
