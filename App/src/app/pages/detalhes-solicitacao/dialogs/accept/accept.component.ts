import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemSolicitacao } from 'src/app/interfaces';
import {
  DetalhesSolicitacaoService,
  DetalhesSolicitacaoUpdaterService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss'],
})
export class AcceptComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ItemSolicitacao,
    private tableUpdaterService: DetalhesSolicitacaoUpdaterService,
    private detalhesSolicitacaoService: DetalhesSolicitacaoService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  // Métodos
  public saveData(
    message: string,
    recusado: boolean,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = {
          recusado,
        };

        this.detalhesSolicitacaoService
          .updateItem(this.dialogData.id, formData)
          .subscribe({
            complete: () => {
              this.openSnackBar(false);
              this.tableUpdaterService.updateTable();
            },
            error: (e) => {
              this.openSnackBar(true);
              console.error('Ocorreu um erro:', e);
            },
          });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
