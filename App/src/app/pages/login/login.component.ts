import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required], //TODO add more validatos
    password: ['', Validators.required], //TODO add more validatos
  });

  constructor(private AuthService: AuthService, private fb: FormBuilder) {}

  login() {
    let user = this.AuthService.login(
      this.form.value.username,
      this.form.value.password
    );
    if (!user) {
      alert('Usuário ou senha inválido!');
    }
  }
}
