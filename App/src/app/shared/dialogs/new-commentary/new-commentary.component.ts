import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSaveComponent } from 'src/app/shared/dialogs/confirm-save/confirm-save.component';

@Component({
  selector: 'app-new-commentary',
  templateUrl: './new-commentary.component.html',
  styleUrls: ['./new-commentary.component.scss'],
})
export class NewCommentaryComponent {
  constructor(public dialog: MatDialog) {}

  confirm(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.closeAll();
    this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
