import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseLot, PurchaseLotsData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseLotsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  listPerPage(page: number): Observable<PurchaseLotsData> {
    const headers = this.getHeaders();
    return this.http.get<PurchaseLotsData>(
      `http://localhost:3000/lotesdecompra/page/${page}`,
      { headers }
    );
  }

  listAll(): Observable<PurchaseLotsData> {
    const headers = this.getHeaders();
    return this.http.get<PurchaseLotsData>(
      `http://localhost:3000/lotesdecompra`,
      { headers }
    );
  }

  addNew(body: PurchaseLot): Observable<PurchaseLot> {
    const headers = this.getHeaders();
    return this.http.post<PurchaseLot>(
      `http://localhost:3000/lotesdecompra`,
      body,
      { headers }
    );
  }

  edit(body: PurchaseLot, id: number): Observable<PurchaseLot> {
    const headers = this.getHeaders();
    return this.http.put<PurchaseLot>(
      `http://localhost:3000/lotesdecompra/${id}`,
      body,
      { headers }
    );
  }
}
