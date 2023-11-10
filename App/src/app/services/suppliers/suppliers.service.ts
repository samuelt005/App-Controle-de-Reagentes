import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier, SuppliersData } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  headers = {
    'content-type': 'application/json',
    Authorization: 'TOKEN',
  };

  listPerPage(page: number): Observable<SuppliersData> {
    return this.http.get<SuppliersData>(
      `http://localhost:3000/fornecedores/page/${page}`
    );
  }

  listAll(): Observable<SuppliersData> {
    return this.http.get<SuppliersData>(`http://localhost:3000/fornecedores`);
  }

  addNew(supplier: Supplier): Observable<Supplier> {
    const body = JSON.stringify(supplier);
    return this.http.post<Supplier>(
      `http://localhost:3000/fornecedores`,
      body,
      { headers: this.headers }
    );
  }

  edit(supplier: Supplier, id: number): Observable<Supplier> {
    const body = JSON.stringify(supplier);
    return this.http.put<Supplier>(
      `http://localhost:3000/fornecedores/${id}`,
      body
    );
  }
}
