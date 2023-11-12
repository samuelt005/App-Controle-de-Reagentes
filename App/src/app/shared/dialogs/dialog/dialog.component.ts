import { Component } from '@angular/core';
import { SnackbarComponent } from '../..';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  template: '',
})
export abstract class DialogComponent {
  constructor(public snackBar: MatSnackBar) {}

  getFormattedCnpj(cnpj: string): string {
    if (cnpj.length == 14) {
      const formattedCnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
      return formattedCnpj;
    } else {
      return 'CNPJ inválido';
    }
  }

  openSnackBar(error: boolean, message?: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      data: {error, message },
    });
  }
}
