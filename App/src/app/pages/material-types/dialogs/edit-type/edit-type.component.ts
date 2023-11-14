import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditType, Tags, UnsDeMedida } from 'src/app/interfaces';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { EditTagsComponent } from '../edit-tags/edit-tags.component';
import { ConfirmInactivationComponent } from '../confirm-inactivation/confirm-inactivation.component';
import {
  MaterialTypesService,
  MaterialTypesUpdaterService,
  UnsDeMedidaService,
} from 'src/app/services';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss'],
})
export class EditTypeComponent extends DialogComponent implements OnInit {
  form = new FormGroup({
    cod: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    descricao: new FormControl('', [Validators.required]),
    loc_estoque: new FormControl(''),
    id_un_de_medida: new FormControl('', [Validators.required]),
  });

  ativo = false;
  desativavel = false;
  tags: Tags[];

  selectData: UnsDeMedida[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: EditType,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private materialTypesService: MaterialTypesService,
    private tableUpdaterService: MaterialTypesUpdaterService,
    private unsDeMedidaService: UnsDeMedidaService
  ) {
    super(snackBar);

    this.form.setValue({
      cod: injectedData.rowData.cod.toString(),
      descricao: injectedData.rowData.descricao,
      loc_estoque: injectedData.rowData.loc_estoque,
      id_un_de_medida: injectedData.rowData.un_de_medida.id.toString(),
    });

    if (injectedData.rowData.ativo === true) {
      this.ativo = true;
    }

    if (injectedData.rowData.estoque_atual === '0.0000') {
      this.desativavel = true;
    }

    this.tags = injectedData.rowData.tags;
  }

  openTags(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tags: Tags[],
    id: number,
  ): void {
    this.dialog.open(EditTagsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tags, id },
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
          cod: number;
          descricao: string;
          loc_estoque: string;
          id_un_de_medida: number;
        };

        this.materialTypesService
          .edit(formData, this.injectedData.rowData.id)
          .subscribe({
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

  changeActive(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    ativo: boolean
  ) {
    const dialogRef = this.dialog.open(ConfirmInactivationComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { ativo },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialTypesService
          .updateActive(this.injectedData.rowData.id)
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
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.selectData = responseData;
    });
  }
}
