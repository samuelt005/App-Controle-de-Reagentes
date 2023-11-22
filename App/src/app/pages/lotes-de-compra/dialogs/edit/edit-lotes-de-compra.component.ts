import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LotesDeCompraDialog } from 'src/app/interfaces';
import {
  LotesDeCompraService,
  LotesDeCompraUpdaterService,
} from 'src/app/services';
import { DialogComponent, ConfirmSaveComponent } from 'src/app/shared';

@Component({
  templateUrl: './edit-lotes-de-compra.component.html',
  styleUrls: ['./edit-lotes-de-compra.component.scss'],
})
export class EditLotesDeCompraComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: LotesDeCompraDialog,
    private tableUpdaterService: LotesDeCompraUpdaterService,
    private lotesDeCompraService: LotesDeCompraService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.form.setValue({
      numero: dialogData.rowData.numero.toString(),
    });
  }

  // Atributos
  public form = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  // Métodos
  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = ''
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          numero: number;
        };

        this.lotesDeCompraService
          .edit(formData, this.dialogData.rowData.id)
          .subscribe({
            complete: () => {
              this.openSnackBar(false);
              this.tableUpdaterService.updateTable();
            },
            error: (e) => {
              console.log(e);
              if (e.status === 409) {
                this.openSnackBar(true, 'Este lote de compra já existe.');
              } else {
                this.openSnackBar(true);
              }
              console.error('Ocorreu um erro:', e);
            },
          });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
