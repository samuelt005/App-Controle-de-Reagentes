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
  TiposDeReagenteService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: ItemSolicitacao,
    private tableUpdaterService: DetalhesSolicitacaoUpdaterService,
    private detalhesSolicitacaoService: DetalhesSolicitacaoService,
    private tiposDeReagenteService: TiposDeReagenteService,
    private lotesDeCompraService: LotesDeCompraService,
    private nfesService: NfesService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);

    this.form.setValue({
      lote: dialogData.lote?.id.toString() || '',
      nfe: dialogData.nfe?.id.toString() || '',
      valor_tot: dialogData.valor_tot,
      qtd_rec: dialogData.qtd_rec,
      validade: dialogData.validade,
    });

    this.quantidadePlaceholder =
      'Quant. recebida em ' + dialogData.tipo.un_de_medida.nome;
  }

  // Atributos
  public form = new FormGroup({
    lote: new FormControl(''),
    nfe: new FormControl({ value: '', disabled: true }),
    valor_tot: new FormControl({ value: '', disabled: true }),
    qtd_rec: new FormControl({ value: '', disabled: true }),
    validade: new FormControl({ value: '', disabled: true }, [dateValidator()]),
  }); // TODO validar form

  public nfesSelectData: NfesData[] = [];
  public lotesSelectData: LotesDeCompraData[] = [];

  public quantidadePlaceholder = '';

  // Métodos
  public onLoteSelectionChange() {
    this.form.get('nfe')?.enable();
    this.form.get('valor_tot')?.enable();
    this.form.get('qtd_rec')?.enable();
    this.form.get('validade')?.enable();
  }

  public clearLoteValue() {
    const loteControl = this.form.get('lote');
    if (loteControl) {
      loteControl.setValue('');
      this.form.get('nfe')?.setValue('');
      this.form.get('valor_tot')?.setValue('');
      this.form.get('qtd_rec')?.setValue('');
      this.form.get('validade')?.setValue('');
      this.form.get('nfe')?.disable();
      this.form.get('valor_tot')?.disable();
      this.form.get('qtd_rec')?.disable();
      this.form.get('validade')?.disable();
    }
  }

  public clearNfeValue() {
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
          valor_tot: string | null;
          qtd_rec: string | null;
          validade: Date | null;
          data: string;
        };

        if (formData.lote == '' && this.form.get('nfe')?.disabled) {
          formData.nfe = null;
          formData.valor_tot = null;
          formData.qtd_rec = null;
          formData.validade = null;
        }

        if (formData.lote == '') {
          formData.lote = null;
        }

        if (formData.nfe == '') {
          formData.nfe = null;
          formData.valor_tot = null;
          formData.qtd_rec = null;
          formData.validade = null;
        }

        const selectedNfe = this.nfesSelectData.find(
          (nfe) => nfe.id.toString() === formData.nfe
        );

        console.log(selectedNfe);

        if (selectedNfe) {
          formData.data = selectedNfe?.data_emissao;
        }

        if (this.dialogData.id !== null) {
          this.detalhesSolicitacaoService
            .updateItem(this.dialogData.id, formData)
            .subscribe({
              complete: () => {
                this.tableUpdaterService.updateTable();
                this.openSnackBar(false);
              },
              error: (e) => {
                this.openSnackBar(true);
                console.error('Ocorreu um erro:', e);
              },
            });
        } else {
          console.error('ID é nulo. Não foi possível salvar.');
          return;
        }
      } else {
        this.dialog.closeAll();
      }
    });
  }

  public ngOnInit(): void {
    this.nfesService.listAll().subscribe((responseData) => {
      this.nfesSelectData = responseData;
    });
    this.lotesDeCompraService.listAll().subscribe((responseData) => {
      this.lotesSelectData = responseData;
    });

    if (this.dialogData.lote !== null) {
      this.form.get('nfe')?.enable();
      this.form.get('valor_tot')?.enable();
      this.form.get('qtd_rec')?.enable();
      this.form.get('validade')?.enable();
    }
  }
}
