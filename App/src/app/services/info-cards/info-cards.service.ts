import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoCard } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InfoCardsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  getItemsSum(table: string, column: string): Observable<InfoCard> {
    const headers = this.getHeaders();
    return this.http.get<InfoCard>(
      `${environment.apiUrl}/items/sum/${table}/${column}`,
      { headers }
    );
  }

  getActiveTypesCount(): Observable<InfoCard> {
    const headers = this.getHeaders();
    return this.http.get<InfoCard>(
      `${environment.apiUrl}/tiposdereagente/count/actives`,
      { headers }
    );
  }

  getMostUsedCount(): Observable<InfoCard> {
    const headers = this.getHeaders();
    return this.http.get<InfoCard>(
      `${environment.apiUrl}/tiposdereagente/find/mostused`,
      { headers }
    );
  }
}
