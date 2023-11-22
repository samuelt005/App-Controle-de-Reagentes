import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmSaveComponent } from 'src/app/shared';

@Component({
  templateUrl: './confirm-inactivation.component.html',
  styleUrls: ['./confirm-inactivation.component.scss'],
})
export class ConfirmInactivationComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private dialogRef: MatDialogRef<ConfirmSaveComponent>
  ) {
    if (data) {
      this.active = true;
    }
  }

  // Atributos
  public active = false;

  // Métodos
  public confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
