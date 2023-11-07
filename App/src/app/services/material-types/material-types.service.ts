import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypesService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/tiposdereagente/page/${page}`);
  }
}
