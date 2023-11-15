import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
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
      `http://localhost:3000/tiposdereagente/page/${page}/active`,
      { headers }
    );
  }
}
