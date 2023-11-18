import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserData, updatePassword } from 'src/app/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserData | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.haveToken()) {
      this.decodeJWT();
    }
  }

  private getHeaders(): HttpHeaders {
    const userToken = this.tokenService.returnToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userToken}`
    );
    return headers;
  }

  public decodeJWT() {
    const token = this.tokenService.returnToken();
    const user = jwtDecode(token) as UserData;
    this.userSubject.next(user);
  }

  public returnUser() {
    return this.userSubject.asObservable();
  }

  public saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  public logout() {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  public isLogged() {
    return this.tokenService.haveToken();
  }

  public getUserId(): string | null {
    const user = this.userSubject.value;
    return user ? user.id : null;
  }

  public getUserData() {
    const user = this.userSubject.value;
    return user ? user : null;
  }

  public updatePassword(body: updatePassword, id: string): Observable<unknown> {
    const headers = this.getHeaders();
    return this.http.put<unknown>(
      `${environment.apiUrl}/usuarios/${id}/senha`,
      body,
      {
        headers,
      }
    );
  }
}
