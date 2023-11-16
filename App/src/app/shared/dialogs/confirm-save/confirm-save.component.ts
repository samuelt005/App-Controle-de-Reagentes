import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-save',
  templateUrl: './confirm-save.component.html',
  styleUrls: ['./confirm-save.component.scss'],
})
export class ConfirmSaveComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmSaveComponent>
  ) {}

  // Métodos
  public confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
