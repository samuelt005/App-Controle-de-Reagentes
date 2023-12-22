import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserData, updatePassword } from 'src/app/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    if (this.tokenService.haveToken()) {
      this.decodeJWT();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.tokenService.haveToken()) {
        this.checkTokenValidity();
      }
    });
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
    this.checkTokenValidity();
  }

  public logout() {
    const headers = this.getHeaders();

    this.http
      .post<string>(`${environment.apiUrl}/auth/logout`, {}, { headers })
      .subscribe(
        () => {
          this.tokenService.deleteToken();
          this.userSubject.next(null);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout failed:', error);
          this.tokenService.deleteToken();
          this.userSubject.next(null);
          this.router.navigate(['/login']);
        }
      );
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

  public getUserRole() {
    return this.userSubject.value?.perfil;
  }

  private checkTokenValidity() {
    const token = this.tokenService.returnToken();
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        this.logout();
      }
    }
  }

  public updatePassword(body: updatePassword, id: string): Observable<unknown> {
    const headers = this.getHeaders();
    return this.http.put<unknown>(
      `${environment.apiUrl}/usuario/${id}/senha`,
      body,
      {
        headers,
      }
    );
  }

  public checkEmailConfirmed(): Observable<boolean> {
    const headers = this.getHeaders();
    const id = this.getUserId();
    return this.http.get<boolean>(
      `${environment.apiUrl}/usuario/${id}/emailconfirmado`,
      {
        headers,
      }
    );
  }

  // public createAccount(body: updatePassword, id: string): Observable<unknown> {
  //   const headers = this.getHeaders();
  //   return this.http.put<unknown>(
  //     `${environment.apiUrl}/usuarios/${id}/senha`,
  //     body,
  //     {
  //       headers,
  //     }
  //   );
  // }
}
