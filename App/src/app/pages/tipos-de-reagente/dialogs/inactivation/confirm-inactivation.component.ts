import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmSaveComponent } from 'src/app/shared';

@Component({
  selector: 'app-confirm-inactivation',
  templateUrl: './confirm-inactivation.component.html',
  styleUrls: ['./confirm-inactivation.component.scss'],
})
export class ConfirmInactivationComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    public dialog: MatDialog,
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
