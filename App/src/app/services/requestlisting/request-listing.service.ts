import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestListingRow } from 'src/app/interfaces/tables/request-listing-row';


@Injectable({
  providedIn: 'root'
})
export class RequestListingService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<any> {
    return this.http.get<RequestListingRow[]>(`http://localhost:3000/Solicitacoes/page/${page}`);
  }
}
