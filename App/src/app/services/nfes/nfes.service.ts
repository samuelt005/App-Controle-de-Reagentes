import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nfe, NfesData } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NfesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  listPerPage(page: number): Observable<NfesData> {
    const headers = this.getHeaders();
    return this.http.get<NfesData>(`${environment.apiUrl}/nfes/page/${page}`, {
      headers,
    });
  }

  listAll(): Observable<NfesData> {
    const headers = this.getHeaders();
    return this.http.get<NfesData>(`${environment.apiUrl}/nfes`, { headers });
  }

  addNew(body: Nfe): Observable<Nfe> {
    const headers = this.getHeaders();
    return this.http.post<Nfe>(`${environment.apiUrl}/nfes`, body, { headers });
  }

  edit(body: Nfe, id: number): Observable<Nfe> {
    const headers = this.getHeaders();
    return this.http.put<Nfe>(`${environment.apiUrl}/nfes/${id}`, body, {
      headers,
    });
  }
}
