import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedoresService, FornecedoresUpdaterService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cnpjValidator } from 'src/app/utils';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-fornecedores.component.html',
  styleUrls: ['./new-fornecedores.component.scss'],
})
export class NewFornecedoresComponent extends DialogComponent {
  // Construtor
  constructor(
    private suppliersService: FornecedoresService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: FornecedoresUpdaterService
  ) {
    super(snackBar);
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
    message = 'O item não poderá ser excluído!'
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

        this.suppliersService.addNew(formData).subscribe({
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
