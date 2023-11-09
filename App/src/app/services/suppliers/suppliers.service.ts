import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuppliersData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  listPerPage(page: number): Observable<SuppliersData> {
    return this.http.get<SuppliersData>(
      `http://localhost:3000/fornecedores/page/${page}`
    );
  }

  listAll(): Observable<SuppliersData> {
    return this.http.get<SuppliersData>(
      `http://localhost:3000/fornecedores`
    );
  }
}
