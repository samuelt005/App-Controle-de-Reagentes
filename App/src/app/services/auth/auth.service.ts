import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from 'src/app/interfaces';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment.development';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  public auth(body: AuthRequest): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, body, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          if (response.body) {
            this.userService.saveToken(response.body?.accessToken);
            this.loginService.triggerLoginSuccessEvent();
          }
        })
      );
  }
}
