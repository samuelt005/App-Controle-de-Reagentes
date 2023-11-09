import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LotsData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LotsService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<LotsData> {
    return this.http.get<LotsData>(
      `http://localhost:3000/lotesdecompra/page/${page}`
    );
  }

  listAll(): Observable<LotsData> {
    return this.http.get<LotsData>(`http://localhost:3000/lotesdecompra`);
  }
}
