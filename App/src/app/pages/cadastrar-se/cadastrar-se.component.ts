import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.scss'],
})
export class CadastrarSeComponent implements OnInit {
  // Construtor
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  // Atributos
  public form = new FormGroup({
    ra: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  });

  public registerError = '';

  // Métodos
  public signup() {
    const formData = this.form.value as unknown as {
      ra: string;
      codigo: string;
    };

    // this.authService.auth(formData).subscribe({
    //   next: () => {
    //     setTimeout(() => {
    //       this.router.navigate(['/listagem/page/1']);
    //     }, 500);
    //   },
    //   error: (e) => {
    //     if (e.status === 404 || e.status === 401) {
    //       this.registerError = 'Usuário ou senha incorreto!';
    //     }
    //   },
    // });
  }

  public return() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

  public ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(['/listagem/page/1']);
    }
  }
}
