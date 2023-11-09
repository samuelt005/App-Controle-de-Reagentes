import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: unknown[] = [
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

  // session: AuthService;

  // login(username: string, password: string) {
  //   const user = this.users.find(
  //     (user) => user.username === username && user.password === password
  //   );
  //   if (user) {
  //     this.session = user;
  //     localStorage.setItem('session', JSON.stringify(this.session));
  //   }

  //   return user;
  // }
}
