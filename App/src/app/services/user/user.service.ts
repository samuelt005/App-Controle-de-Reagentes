import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserData } from 'src/app/interfaces';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserData | null>(null);

  constructor(private tokenService: TokenService) {
    if (this.tokenService.haveToken()) {
      this.decodeJWT();
    }
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
}
