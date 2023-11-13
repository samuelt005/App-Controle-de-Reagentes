import {
  PurchaseLotsService,
  PurchaseLotsUpdaterService,
} from 'src/app/services';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-new-purchase-lots',
  templateUrl: './new-purchase-lot.component.html',
  styleUrls: ['./new-purchase-lot.component.scss'],
})
export class NewPurchaseLotComponent extends DialogComponent {
  form = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    private purchaseLotsService: PurchaseLotsService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: PurchaseLotsUpdaterService
  ) {
    super(snackBar);
  }

  saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'O item não poderá ser excluído!'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          numero: number;
        };

        this.purchaseLotsService.addNew(formData).subscribe({
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
