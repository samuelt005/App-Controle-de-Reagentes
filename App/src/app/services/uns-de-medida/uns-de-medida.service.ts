import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnsDeMedida } from 'src/app/interfaces';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UnsDeMedidaService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  listAll(): Observable<UnsDeMedida[]> {
    const headers = this.getHeaders();
    return this.http.get<UnsDeMedida[]>(`http://localhost:3000/unsdemedida`, {
      headers,
    });
  }
}
