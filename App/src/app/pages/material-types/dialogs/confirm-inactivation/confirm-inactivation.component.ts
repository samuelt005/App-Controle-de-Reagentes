import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ChangeActive } from 'src/app/interfaces';
import { ConfirmSaveComponent } from 'src/app/shared';

@Component({
  selector: 'app-confirm-inactivation',
  templateUrl: './confirm-inactivation.component.html',
  styleUrls: ['./confirm-inactivation.component.scss'],
})
export class ConfirmInactivationComponent {
  active = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChangeActive,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmSaveComponent>
  ) {
    if (data.ativo) {
      this.active = true;
    }
  }

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
