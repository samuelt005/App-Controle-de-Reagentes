import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/interfaces';
import { SnackbarComponent } from 'src/app/shared';
import { passwordValidator } from 'src/app/utils';

@Component({
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.scss'],
})
export class CadastrarSeComponent implements OnInit {
  // Construtor
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Atributos
  public firstForm = new FormGroup({
    ra: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  });

  public secondForm = new FormGroup({
    password: new FormControl('', [Validators.required, passwordValidator()]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  public registerError = '';
  public secondStep = false;
  public changePasswordError = '';
  public hasMinLength = false;
  public hasNumber = false;
  public hasLowerCase = false;
  public hasUpperCase = false;
  public hasSpecialChar = false;

  // Métodos
  public validateBeforePassword() {
    const ra = this.firstForm.get('ra')?.value;
    const codigo_unico = this.firstForm.get('codigo')?.value;

    if (ra && codigo_unico) {
      this.userService
        .validateBeforePassword(ra, codigo_unico)
        .subscribe((responseData) => {
          if (!responseData) {
            this.registerError = 'RA ou Código Único incorreto!';
          } else {
            setTimeout(() => {
              this.secondStep = true;
            }, 500);
          }
        });
    }
  }

  checkRequirements() {
    const password = this.secondForm.get('password')?.value;

    if (password !== null && password !== undefined) {
      const hasMinLength = password.length >= 8;
      const hasNumber = /\d/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      this.hasMinLength = hasMinLength;
      this.hasNumber = hasNumber;
      this.hasLowerCase = hasLowerCase;
      this.hasUpperCase = hasUpperCase;
      this.hasSpecialChar = hasSpecialChar;
    }
  }

  public saveData() {
    const ra = this.firstForm.get('ra')?.value;
    const codigo_unico = this.firstForm.get('codigo')?.value;
    const password = this.secondForm.get('password')?.value;
    const confirm_password = this.secondForm.get('confirm_password')?.value;

    this.changePasswordError = '';

    if (password !== confirm_password) {
      this.changePasswordError = 'Confirmação de senha incorreta!';
      return;
    }

    if (ra && codigo_unico && password) {
      const formData: NewUser = {
        ra,
        codigo_unico,
        password,
      };

      this.userService.createAccount(formData).subscribe({
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.dialog.closeAll();
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 2000,
              data: { error: false, message: 'Conta criada com sucesso!' },
            });
          }, 500);
        },
        error: () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: {
              error: true,
              message: 'Não foi possível salvar sua conta!',
            },
          });
        },
      });
    }
  }

  public returnLogin() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

  public returnFirstStep() {
    setTimeout(() => {
      this.secondStep = false;
    }, 500);
  }

  public ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(['/listagem/page/1']);
    }
    this.secondForm.get('password')?.valueChanges.subscribe(() => {
      this.checkRequirements();
    });
  }
}
