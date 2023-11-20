import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ItemSolicitacao,
  ItemSolicitacaoRequest,
  LotesDeCompraData,
  NfesData,
} from 'src/app/interfaces';
import {
  DetalhesSolicitacaoService,
  DetalhesSolicitacaoUpdaterService,
  LotesDeCompraService,
  NfesService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ItemSolicitacao,
    public override snackBar: MatSnackBar,
    private nfesService: NfesService,
    private detalhesSolicitacaoService: DetalhesSolicitacaoService,
    public dialog: MatDialog,
    private lotesDeCompraService: LotesDeCompraService,
    private tableUpdaterService: DetalhesSolicitacaoUpdaterService
  ) {
    super(snackBar);

    this.form.setValue({
      lote: dialogData.lote?.id.toString() || '',
      nfe: dialogData.nfe?.id.toString() || '',
    });
  }

  // Atributos
  public form = new FormGroup({
    lote: new FormControl(''),
    nfe: new FormControl({ value: '', disabled: true }),
  });

  public nfesSelectData: NfesData[] = [];
  public lotesSelectData: LotesDeCompraData[] = [];

  // Métodos
  onLoteSelectionChange() {
    this.form.get('nfe')?.enable();
  }

  clearLoteValue() {
    const loteControl = this.form.get('lote');
    const nfeControl = this.form.get('nfe');
    if (loteControl) {
      loteControl.setValue('');
      nfeControl?.setValue('');
      nfeControl?.disable();
    }
  }

  clearNfeValue() {
    const nfeControl = this.form.get('nfe');
    if (nfeControl) {
      nfeControl?.setValue('');
    }
  }

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
        const formData = this.form.value as ItemSolicitacaoRequest as {
          lote: string | null;
          nfe: string | null;
        };

        if (formData.lote == '' && this.form.get('nfe')?.disabled) {
          formData.nfe = null;
        }

        if (formData.lote == '') {
          formData.lote = null;
        }

        if (formData.nfe == '') {
          formData.nfe = null;
        }

        this.detalhesSolicitacaoService
          .updateItem(this.dialogData.id, formData)
          .subscribe({
            complete: () => {
              this.openSnackBar(false);
              this.tableUpdaterService.updateTable();
            },
            error: (e) => {
              this.openSnackBar(true);
              console.error('Ocorreu um erro:', e);
            },
          });
      } else {
        this.dialog.closeAll();
      }
    });
  }

  ngOnInit(): void {
    this.nfesService.listAll().subscribe((responseData) => {
      this.nfesSelectData = responseData;
    });
    this.lotesDeCompraService.listAll().subscribe((responseData) => {
      this.lotesSelectData = responseData;
    });

    if (this.dialogData.lote !== null) {
      this.form.get('nfe')?.enable();
    }
  }
}
