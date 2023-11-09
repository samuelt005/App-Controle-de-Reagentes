import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number, id: number): Observable<HistoryData> {
    return this.http.get<HistoryData>(
      `http://localhost:3000/history/item/${id}/page/${page}`
    );
  }
}
