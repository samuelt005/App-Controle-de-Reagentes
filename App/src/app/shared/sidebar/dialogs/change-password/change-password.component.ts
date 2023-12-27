import { UserService } from 'src/app/services';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import { passwordValidator } from 'src/app/utils';
import { UpdatePassword } from 'src/app/interfaces';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: string,
    private userService: UserService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  // Atributos
  public form = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [
      Validators.required,
      passwordValidator(),
    ]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  public changePasswordError = '';
  public hasMinLength = false;
  public hasNumber = false;
  public hasLowerCase = false;
  public hasUpperCase = false;
  public hasSpecialChar = false;

  // Métodos
  checkRequirements() {
    const password = this.form.get('new_password')?.value;

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
    const formData = this.form.value as UpdatePassword as {
      old_password: string;
      new_password: string;
      confirm_password: string;
    };

    if (formData.new_password !== formData.confirm_password) {
      this.changePasswordError = 'Confirmação de senha incorreta!';
      return;
    }

    this.userService.updatePassword(formData, this.dialogData).subscribe({
      complete: () => {
        this.dialog.closeAll();
        this.openSnackBar(false);
      },
      error: (e) => {
        if (e.status === 401) {
          this.changePasswordError = 'Senha atual incorreta!';
        } else if (e.status === 400) {
          this.changePasswordError = 'Nova senha igual a senha atual!';
        } else {
          console.error('Ocorreu um erro:', e);
        }
      },
    });
  }

  ngOnInit() {
    this.form.get('new_password')?.valueChanges.subscribe(() => {
      this.checkRequirements();
    });
  }
}
