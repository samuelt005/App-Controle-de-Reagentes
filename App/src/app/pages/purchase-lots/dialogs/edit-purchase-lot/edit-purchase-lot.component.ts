import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPurchaseLot } from 'src/app/interfaces';
import { PurchaseLotsService } from 'src/app/services';
import { DialogComponent, ConfirmSaveComponent } from 'src/app/shared';

@Component({
  selector: 'app-edit-purchase-lot',
  templateUrl: './edit-purchase-lot.component.html',
  styleUrls: ['./edit-purchase-lot.component.scss'],
})
export class EditPurchaseLotComponent extends DialogComponent {
  form = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditPurchaseLot,
    private purchaseLotsService: PurchaseLotsService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.form.setValue({
      numero: injectedData.rowData.numero.toString(),
    });
  }

  saveData(enterAnimationDuration = '100ms', exitAnimationDuration = '100ms') {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          numero: number;
        };

        this.purchaseLotsService
          .edit(formData, this.injectedData.rowData.id)
          .subscribe({
            complete: () => {
              this.openSnackBar('Salvo com sucesso.', false);
            },
            error: (e) => {
              console.error('Ocorreu um erro:', e);
              this.openSnackBar('Erro ao salvar. Tente novamente.', true);
            },
          });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
