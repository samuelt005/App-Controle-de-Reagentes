import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NfesData } from 'src/app/interfaces';
@Injectable({
  providedIn: 'root'
})
export class NfesService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<NfesData> {
    return this.http.get<NfesData>(`http://localhost:3000/nfes/page/${page}`);
  }
}
