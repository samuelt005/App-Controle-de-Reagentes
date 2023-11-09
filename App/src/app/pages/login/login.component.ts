import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required], //TODO add more validatos
    password: ['', Validators.required], //TODO add more validatos
  });

  constructor(
    private AuthService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  // login() {
  //   const user = this.AuthService.login(
  //     this.form.value.username,
  //     this.form.value.password
  //   );
  //   if (!user) {
  //     alert('Usuário ou senha inválido!');
  //   }
  //   setTimeout(() => {
  //     this.router.navigate(['/listing/page/1']);
  //   }, 500);
  // }
}
