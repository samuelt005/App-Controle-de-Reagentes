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

  decodeJWT() {
    const token = this.tokenService.returnToken();
    const user = jwtDecode(token) as UserData;
    this.userSubject.next(user);
  }

  returnUser() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.haveToken();
  }
}
