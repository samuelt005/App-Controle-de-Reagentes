import { Component } from '@angular/core';
import { SnackbarComponent } from '../..';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  template: '',
})
export abstract class DialogComponent {
  constructor(public snackBar: MatSnackBar) {}



  openSnackBar(message: string, error: boolean, success: boolean) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      data: { message, error, success },
    });
  }
}
