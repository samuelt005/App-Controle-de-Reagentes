import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestListingData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestListingService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<RequestListingData> {
    return this.http.get<RequestListingData>(
      `http://localhost:3000/Solicitacoes/page/${page}`
    );
  }
}
