import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NfesRow } from 'src/app/interfaces/tables/nfes-row';

@Injectable({
  providedIn: 'root'
})
export class NfesService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<any> {
    return this.http.get<NfesRow[]>(`http://localhost:3000/nfes/page/${page}`);
  }
}
