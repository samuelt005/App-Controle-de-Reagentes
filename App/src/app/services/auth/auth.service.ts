import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthData, AuthResponse } from 'src/app/interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  auth(body: AuthData): Observable<HttpResponse<AuthResponse>> {
    console.log(body);
    return this.http
      .post<AuthResponse>(`http://localhost:3000/auth/login`, body, {
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
