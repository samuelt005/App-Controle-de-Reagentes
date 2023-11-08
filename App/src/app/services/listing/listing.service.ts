import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingRow } from 'src/app/interfaces/tables/listing-row';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<any> {
    return this.http.get<ListingRow[]>(`http://localhost:3000/tiposdereagente/page/${page}/active`);
  }
}
