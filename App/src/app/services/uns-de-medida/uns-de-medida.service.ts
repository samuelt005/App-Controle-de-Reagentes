import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnsDeMedida } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UnsDeMedidaService {
  constructor(private http: HttpClient) {}

  listAll(): Observable<UnsDeMedida[]> {
    return this.http.get<UnsDeMedida[]>(`http://localhost:3000/unsdemedida`);
  }
}
