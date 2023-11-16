import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedoresData } from 'src/app/interfaces';
import {
  NfesService,
  NfesUpdaterService,
  FornecedoresService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  selector: 'app-new-nfe',
  templateUrl: './new-nfe.component.html',
  styleUrls: ['./new-nfe.component.scss'],
})
export class NewNfeComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    private fornecedoresService: FornecedoresService,
    private nfesService: NfesService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: NfesUpdaterService
  ) {
    super(snackBar);
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
          numero: number;
          data_emissao: Date;
          id_fornecedor: number;
        }; // TODO ver se tem uma maneira melhor de fazer esta parte

        this.nfesService.addNew(formData).subscribe({
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
