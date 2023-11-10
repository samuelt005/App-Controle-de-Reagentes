import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditSupplier } from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';
import { DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
})
export class EditSupplierComponent extends DialogComponent {
  SupplierData: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditSupplier,
    private formBuilder: FormBuilder,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.SupplierData = this.formBuilder.group({
      id: injectedData.rowData.id,
      cnpj: injectedData.rowData.cnpj,
      razao_social: injectedData.rowData.razao_social,
    });
  }

  saveData() {
    this.suppliersService
      .edit(this.SupplierData.value, this.SupplierData.value.id)
      .subscribe({
        complete: () => {
          this.openSnackBar('Salvo com sucesso.', false, true);
        },
        error: (e) => {
          console.error('Ocorreu um erro:', e);
          this.openSnackBar('Erro ao salvar. Tente novamente.', true, false);
        },
      });
  }
}
