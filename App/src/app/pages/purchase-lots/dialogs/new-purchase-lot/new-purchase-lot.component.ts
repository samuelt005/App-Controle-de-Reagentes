import { PurchaseLotsService } from 'src/app/services';
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
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
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

        this.purchaseLotsService.addNew(formData).subscribe({
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
