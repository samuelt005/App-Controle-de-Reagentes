import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditSupplier } from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cnpjValidator } from 'src/app/utils';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
})
export class EditSupplierComponent extends DialogComponent {
  form = new FormGroup({
    cnpj: new FormControl('', [cnpjValidator()]),
    razao_social: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditSupplier,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.form.setValue({
      cnpj: injectedData.rowData.cnpj.toString(),
      razao_social: injectedData.rowData.razao_social,
    });
  }

  saveData(enterAnimationDuration = '100ms', exitAnimationDuration = '100ms') {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as {
          cnpj: string;
          razao_social: string;
        };

        this.suppliersService
          .edit(formData, this.injectedData.rowData.id)
          .subscribe({
            complete: () => {
              this.openSnackBar('Salvo com sucesso.', false, true);
            },
            error: (e) => {
              console.error('Ocorreu um erro:', e);
              this.openSnackBar(
                'Erro ao salvar. Tente novamente.',
                true,
                false
              );
            },
          });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
