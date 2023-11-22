import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdjustmentsDialog } from 'src/app/interfaces';
import {
  HistoricoService,
  HistoricoUpdaterService,
  UserService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { dateValidator } from 'src/app/utils';

@Component({
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss'],
})
export class AdjustmentComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: AdjustmentsDialog,
    private tableUpdaterService: HistoricoUpdaterService,
    private historicoService: HistoricoService,
    private userService: UserService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.id = dialogData.id;
    this.quantidadePlaceholder = 'Quantidade em ' + dialogData.unDeMedida;
  }

  // Atributos
  public form = new FormGroup({
    data: new FormControl('', [Validators.required, dateValidator()]),
    valor_total: new FormControl('', [Validators.required]), // TODO Permitir inserir valores negativos
    quantidade: new FormControl('', [Validators.required]),
    comentario: new FormControl('', [Validators.required]),
  });

  public id: number | null = null;
  public quantidadePlaceholder = '';

  // Métodos
  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'O ajuste não poderá ser excluído!'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const id_usuario = this.userService.getUserId();

        const formData = this.form.value as unknown as {
          data: Date;
          valor_total: number;
          quantidade: number;
          comentario: string;
          id_usuario: string;
        };

        if (id_usuario !== null) {
          formData.id_usuario = id_usuario;
        } else {
          console.error('ID do usuário é nulo.');
          return;
        }

        if (this.id !== null) {
          this.historicoService.addNew(this.id, formData).subscribe({
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
          console.error('ID é nulo. Não foi possível salvar.');
          return;
        }
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
