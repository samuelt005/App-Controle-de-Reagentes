import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdjustmentsDialog } from 'src/app/interfaces';
import { HistoricoUpdaterService } from 'src/app/services';
import { DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss'],
})
export class AdjustmentComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: AdjustmentsDialog,
    public override snackBar: MatSnackBar,
    private tableUpdaterService: HistoricoUpdaterService
  ) {
    super(snackBar);
    this.id = dialogData.id;
    this.quantidadePlaceholder = 'Quantidade em ' + dialogData.unDeMedida;
  }

  // Atributos
  public form = new FormGroup({
    data: new FormControl('', [Validators.required, dateValidator()]),
    valor_total: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    comentario: new FormControl('', [Validators.required]),
  });

  public id: number | null = null;
  public quantidadePlaceholder = '';
}
