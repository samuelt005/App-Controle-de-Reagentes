import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Construtor
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  // Atributos
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  public loginError = '';

  // Métodos
  public login() {
    const formData = this.form.value as unknown as {
      email: string;
      senha: string;
    };

    this.authService.auth(formData).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/listagem/page/1']);
        }, 500);
      },
      error: (e) => {
        if (e.status === 404 || e.status === 401) {
          this.loginError = 'Usuário ou senha incorreto!';
        }
      },
    });
  }

  public signup() {
    setTimeout(() => {
      this.router.navigate(['/cadastrar']);
    }, 500);
  }

  public ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(['/listagem/page/1']);
    }
  }
}
