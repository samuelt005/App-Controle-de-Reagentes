import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoCard } from 'src/app/interfaces/info-card';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number, id: number): Observable<any> {
    return this.http.get<InfoCard[]>(`http://localhost:3000/history/item/${id}/page/${page}`);
  }
}
