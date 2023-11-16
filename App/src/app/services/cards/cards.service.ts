import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricosPageData, ListagemPageData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public getListingData(): Observable<ListagemPageData> {
    const headers = this.getHeaders();
    return this.http.get<ListagemPageData>(
      `${environment.apiUrl}/cards/listing`,
      { headers }
    );
  }

  public getHistoryData(id: number): Observable<HistoricosPageData> {
    const headers = this.getHeaders();
    return this.http.get<HistoricosPageData>(
      `${environment.apiUrl}/cards/historico/${id}`,
      { headers }
    );
  }
}
