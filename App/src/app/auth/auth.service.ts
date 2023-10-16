import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any[] = [
    {
      id: 1,
      name: 'Administrador',
      username: 'admin',
      password: 'admin',
    },
    {
      id: 2,
      name: 'Test',
      username: 'test',
      password: 'test',
    },
  ];

  session: any;
  constructor() {}

  login(username: string, password: string) {
    let user = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
    }

    return user;
  }
}
