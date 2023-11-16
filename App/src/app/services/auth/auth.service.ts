import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from 'src/app/interfaces';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public auth(body: AuthRequest): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, body, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const authToken = response.body?.accessToken || '';
          this.userService.saveToken(authToken);
        })
      );
  }
}
