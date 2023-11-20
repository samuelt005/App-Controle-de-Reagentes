import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NfesData, NfesRequest, NfesResponse } from 'src/app/interfaces';
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

  public listPerPage(page: number, search?: string): Observable<NfesResponse> {
    const headers = this.getHeaders();
    let url = `${environment.apiUrl}/nfes/page/${page}`;

    if (search) {
      const params = new HttpParams().set('search', search);
      url += `?${params.toString()}`;
    }

    return this.http.get<NfesResponse>(url, { headers });
  }

  public listAll(): Observable<NfesData[]> {
    const headers = this.getHeaders();
    return this.http.get<NfesData[]>(`${environment.apiUrl}/nfes`, { headers });
  }

  public addNew(body: NfesRequest): Observable<NfesRequest> {
    const headers = this.getHeaders();
    return this.http.post<NfesRequest>(`${environment.apiUrl}/nfes`, body, {
      headers,
    });
  }

  public edit(body: NfesRequest, id: number): Observable<NfesRequest> {
    const headers = this.getHeaders();
    return this.http.put<NfesRequest>(
      `${environment.apiUrl}/nfes/${id}`,
      body,
      {
        headers,
      }
    );
  }
}
