import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedoresDialog } from 'src/app/interfaces';
import { FornecedoresService, FornecedoresUpdaterService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cnpjValidator } from 'src/app/utils';

@Component({
  templateUrl: './edit-fornecedores.component.html',
  styleUrls: ['./edit-fornecedores.component.scss'],
})
export class EditFornecedoresComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: FornecedoresDialog,
    private suppliersService: FornecedoresService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: FornecedoresUpdaterService
  ) {
    super(snackBar);
    this.form.setValue({
      cnpj: dialogData.rowData.cnpj.toString(),
      razao_social: dialogData.rowData.razao_social,
    });
  }

  // Atributos
  public form = new FormGroup({
    cnpj: new FormControl('', [cnpjValidator()]),
    razao_social: new FormControl('', [Validators.required]),
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
          cnpj: string;
          razao_social: string;
        };

        this.suppliersService
          .edit(formData, this.dialogData.rowData.id)
          .subscribe({
            complete: () => {
              this.openSnackBar(false);
              this.tableUpdaterService.updateTable();
            },
            error: (e) => {
              console.log(e);
              if (e.status === 409) {
                this.openSnackBar(true, 'Este fornecedor já existe.');
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
