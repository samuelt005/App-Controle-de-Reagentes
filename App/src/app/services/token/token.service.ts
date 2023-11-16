import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public saveToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  public deleteToken() {
    localStorage.removeItem(KEY);
  }

  public returnToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  public haveToken() {
    return !!this.returnToken();
  }
}
