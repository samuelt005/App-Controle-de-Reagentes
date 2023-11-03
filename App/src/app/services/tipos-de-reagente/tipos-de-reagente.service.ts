import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposDeReagenteService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/tiposdereagente/page/${page}/filtered`)
      .pipe(
        map(response => response.rows)
      );
  }
}
