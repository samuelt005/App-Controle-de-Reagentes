import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnDeMedida } from 'src/app/interfaces';
import {
  TiposDeReagenteService,
  TiposDeReagenteUpdaterService,
  UnsDeMedidaService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  templateUrl: './new-tipos-de-reagente.component.html',
  styleUrls: ['./new-tipos-de-reagente.component.scss'],
})
export class NewTiposDeReagenteComponent
  extends DialogComponent
  implements OnInit
{
  // Construtor
  constructor(
    private tableUpdaterService: TiposDeReagenteUpdaterService,
    private tiposDeReagenteService: TiposDeReagenteService,
    private unsDeMedidaService: UnsDeMedidaService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  // Atributos
  public form = new FormGroup({
    cod: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    descricao: new FormControl('', [Validators.required]),
    loc_estoque: new FormControl(''),
    id_un_de_medida: new FormControl('', [Validators.required]),
  });

  public selectData: UnDeMedida[] = [];

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
          cod: number;
          descricao: string;
          loc_estoque: string;
          id_un_de_medida: number;
        };

        this.tiposDeReagenteService.addNew(formData).subscribe({
          complete: () => {
            this.openSnackBar(false);
            this.tableUpdaterService.updateTable();
          },
          error: (e) => {
            if (e.status === 409) {
              this.openSnackBar(true, 'Este código já está em uso.');
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
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.selectData = responseData;
    });
  }
}
