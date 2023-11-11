import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuppliersService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cnpjValidator } from 'src/app/utils';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss'],
})
export class NewSupplierComponent extends DialogComponent {
  form = new FormGroup({
    cnpj: new FormControl('', [cnpjValidator()]),
    razao_social: new FormControl('', [Validators.required]),
  });

  constructor(
    private suppliersService: SuppliersService,
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
          cnpj: string;
          razao_social: string;
        };

        this.suppliersService.addNew(formData).subscribe({
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
