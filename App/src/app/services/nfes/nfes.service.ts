import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nfe, NfesData } from 'src/app/interfaces';
@Injectable({
  providedIn: 'root',
})
export class NfesService {
  constructor(private http: HttpClient) {}

  headers = {
    'content-type': 'application/json',
    Authorization: 'TOKEN',
  };

  listPerPage(page: number): Observable<NfesData> {
    return this.http.get<NfesData>(`http://localhost:3000/nfes/page/${page}`);
  }

  listAll(): Observable<NfesData> {
    return this.http.get<NfesData>(`http://localhost:3000/nfes`);
  }

  addNew(body: Nfe): Observable<Nfe> {
    console.log(body);
    return this.http.post<Nfe>(`http://localhost:3000/nfes`, body);
  }

  edit(body: Nfe, id: number): Observable<Nfe> {
    return this.http.put<Nfe>(`http://localhost:3000/nfes/${id}`, body);
  }
}
