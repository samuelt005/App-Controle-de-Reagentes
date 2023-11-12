import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseLot, PurchaseLotsData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PurchaseLotsService {
  constructor(private http: HttpClient) {}

  headers = {
    'content-type': 'application/json',
    Authorization: 'TOKEN',
  };

  listPerPage(page: number): Observable<PurchaseLotsData> {
    return this.http.get<PurchaseLotsData>(
      `http://localhost:3000/lotesdecompra/page/${page}`
    );
  }

  listAll(): Observable<PurchaseLotsData> {
    return this.http.get<PurchaseLotsData>(
      `http://localhost:3000/lotesdecompra`
    );
  }

  addNew(body: PurchaseLot): Observable<PurchaseLot> {
    return this.http.post<PurchaseLot>(
      `http://localhost:3000/lotesdecompra`,
      body
    );
  }

  edit(body: PurchaseLot, id: number): Observable<PurchaseLot> {
    return this.http.put<PurchaseLot>(
      `http://localhost:3000/lotesdecompra/${id}`,
      body
    );
  }
}
