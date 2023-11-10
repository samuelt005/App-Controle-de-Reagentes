import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuppliersService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss'],
})
export class NewSupplierComponent extends DialogComponent {
  SupplierData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.SupplierData = this.formBuilder.group({
      cnpj: '',
      razao_social: '',
    });
  }

  saveData(enterAnimationDuration = '100ms', exitAnimationDuration = '100ms') {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.suppliersService.addNew(this.SupplierData.value).subscribe({
          complete: () => {
            this.openSnackBar('Salvo com sucesso.', false, true);
          },
          error: (e) => {
            console.error('Ocorreu um erro:', e);
            this.openSnackBar('Erro ao salvar. Tente novamente.', true, false);
          },
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
