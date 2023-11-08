import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fornecedoresRow } from 'src/app/interfaces/tables/fornecedores-row';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresService {
  constructor(private http: HttpClient) {}

  listAll(): Observable<any> {
    return this.http.get<fornecedoresRow[]>(`http://localhost:3000/fornecedores`);
  }
}
