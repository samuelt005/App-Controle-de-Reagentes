import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedoresData, NfesData } from 'src/app/interfaces';
import {
  NfesService,
  NfesUpdaterService,
  FornecedoresService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  templateUrl: './edit-nfe.component.html',
  styleUrls: ['./edit-nfe.component.scss'],
})
export class EditNfeComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: NfesData,
    private fornecedoresService: FornecedoresService,
    private tableUpdaterService: NfesUpdaterService,
    private nfesService: NfesService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);

    this.form.setValue({
      numero: dialogData.numero.toString(),
      data_emissao: dialogData.data_emissao,
      id_fornecedor: dialogData.emitente.id.toString(),
    });
  }

  // Atributos
  public form = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    data_emissao: new FormControl('', [Validators.required, dateValidator()]),
    id_fornecedor: new FormControl('', [Validators.required]),
  });

  public selectData: FornecedoresData[] = [];

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
          numero: number;
          data_emissao: Date;
          id_fornecedor: number;
        };

        this.nfesService.edit(formData, this.dialogData.id).subscribe({
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

  public ngOnInit(): void {
    this.fornecedoresService.listAll().subscribe((responseData) => {
      this.selectData = responseData.data;
    });
  }
}
