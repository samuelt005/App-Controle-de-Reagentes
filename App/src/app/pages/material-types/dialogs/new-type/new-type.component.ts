import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsDeMedida } from 'src/app/interfaces';
import {
  MaterialTypesService,
  MaterialTypesUpdaterService,
  UnsDeMedidaService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-new-type',
  templateUrl: './new-type.component.html',
  styleUrls: ['./new-type.component.scss'],
})
export class NewTypeComponent extends DialogComponent implements OnInit {
  form = new FormGroup({
    cod: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    descricao: new FormControl('', [Validators.required]),
    loc_estoque: new FormControl(''),
    id_un_de_medida: new FormControl('', [Validators.required]),
  });

  ativo = true;
  desativavel = true;

  selectData: UnsDeMedida[] = [];

  constructor(
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private materialTypesService: MaterialTypesService,
    private tableUpdaterService: MaterialTypesUpdaterService,
    private unsDeMedidaService: UnsDeMedidaService
  ) {
    super(snackBar);
  }

  saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'O item não poderá ser excluído!'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          cod: number;
          descricao: string;
          loc_estoque: string;
          id_un_de_medida: number;
        };

        this.materialTypesService.addNew(formData).subscribe({
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

  ngOnInit(): void {
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.selectData = responseData;
    });
  }
}
