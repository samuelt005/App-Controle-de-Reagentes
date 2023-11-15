import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseLot, PurchaseLotsData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

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
      `${environment.apiUrl}/lotesdecompra/page/${page}`,
      { headers }
    );
  }

  listAll(): Observable<PurchaseLotsData> {
    const headers = this.getHeaders();
    return this.http.get<PurchaseLotsData>(
      `${environment.apiUrl}/lotesdecompra`,
      { headers }
    );
  }

  addNew(body: PurchaseLot): Observable<PurchaseLot> {
    const headers = this.getHeaders();
    return this.http.post<PurchaseLot>(
      `${environment.apiUrl}/lotesdecompra`,
      body,
      { headers }
    );
  }

  edit(body: PurchaseLot, id: number): Observable<PurchaseLot> {
    const headers = this.getHeaders();
    return this.http.put<PurchaseLot>(
      `${environment.apiUrl}/lotesdecompra/${id}`,
      body,
      { headers }
    );
  }
}
