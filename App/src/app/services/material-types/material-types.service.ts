import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypesService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<ListingData> {
    return this.http.get<ListingData>(`http://localhost:3000/tiposdereagente/page/${page}`);
  }
}
