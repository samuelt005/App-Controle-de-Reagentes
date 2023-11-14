import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuppliersRow, EditNfe } from 'src/app/interfaces';
import {
  NfesService,
  NfesUpdaterService,
  SuppliersService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  selector: 'app-edit-nfe',
  templateUrl: './edit-nfe.component.html',
  styleUrls: ['./edit-nfe.component.scss'],
})
export class EditNfeComponent extends DialogComponent implements OnInit {
  form = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    data_emissao: new FormControl('', [Validators.required, dateValidator()]),
    id_fornecedor: new FormControl('', [Validators.required]),
  });

  selectData: SuppliersRow[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditNfe,
    private fornecedoresService: SuppliersService,
    private nfesService: NfesService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: NfesUpdaterService
  ) {
    super(snackBar);

    this.form.setValue({
      numero: injectedData.rowData.numero.toString(),
      data_emissao: injectedData.rowData.data_emissao,
      id_fornecedor: injectedData.rowData.emitente.id.toString(),
    });
  }

  saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = ''
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
          data_emissao: Date;
          id_fornecedor: number;
        };

        this.nfesService
          .edit(formData, this.injectedData.rowData.id)
          .subscribe({
            complete: () => {
              this.openSnackBar(false);
              this.tableUpdaterService.updateTable();
            },
            error: (e) => {
              if (e.status === 409) {
                this.openSnackBar(true, 'Esta nota fiscal já existe.');
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

  ngOnInit(): void {
    this.fornecedoresService.listAll().subscribe((responseData) => {
      this.selectData = responseData.data;
    });
  }
}
