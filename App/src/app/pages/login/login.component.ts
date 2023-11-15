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
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    const formData = this.form.value as unknown as {
      email: string;
      senha: string;
    };

    this.AuthService.auth(formData).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/listing/page/1']);
        }, 500);
      },
      error: (e) => {
        console.error('Ocorreu um erro:', e);
      },
    });
  }

  ngOnInit(): void {
    if (this.userService.isLogged()) {
        this.router.navigate(['/listing/page/1']);
    }
  }
}
