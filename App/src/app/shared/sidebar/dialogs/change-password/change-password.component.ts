import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import { passwordValidator } from 'src/app/utils';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(public dialog: MatDialog, public override snackBar: MatSnackBar) {
    super(snackBar);
  }

  // Atributos
  public form = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required, passwordValidator()]),
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
    const formData = this.form.value as unknown as {
      old_password: string;
      new_password: string;
      confirm_password: string;
    };

    if (formData.new_password !== formData.confirm_password) {
      this.changePasswordError = 'Confirmação de senha incorreta!';
      return;
    }

    this.changePasswordError = 'Senha atual incorreta!';

    console.log(formData);
  }

  ngOnInit() {
    this.form.get('new_password')?.valueChanges.subscribe(() => {
      this.checkRequirements();
    });
  }
}
