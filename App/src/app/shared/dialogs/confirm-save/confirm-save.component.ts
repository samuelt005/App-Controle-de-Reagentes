import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmSave } from 'src/app/interfaces';

@Component({
  selector: 'app-confirm-save',
  templateUrl: './confirm-save.component.html',
  styleUrls: ['./confirm-save.component.scss'],
})
export class ConfirmSaveComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmSave,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmSaveComponent>
  ) {}

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
