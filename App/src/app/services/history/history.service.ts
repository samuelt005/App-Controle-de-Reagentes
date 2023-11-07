import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number, id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/history/item/${id}/page/${page}`);
  }
}
