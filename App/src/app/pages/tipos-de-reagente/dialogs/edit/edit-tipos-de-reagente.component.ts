import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposDeReagenteDialog, Tag, UnDeMedida } from 'src/app/interfaces';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { EditTagsComponent } from '../tags/edit-tags.component';
import { ConfirmInactivationComponent } from '../inactivation/confirm-inactivation.component';
import {
  TiposDeReagenteService,
  TiposDeReagenteUpdaterService,
  UnsDeMedidaService,
} from 'src/app/services';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-tipos-de-reagente.component.html',
  styleUrls: ['./edit-tipos-de-reagente.component.scss'],
})
export class EditTiposDeReagenteComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: TiposDeReagenteDialog,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    private materialTypesService: TiposDeReagenteService,
    private tableUpdaterService: TiposDeReagenteUpdaterService,
    private unsDeMedidaService: UnsDeMedidaService
  ) {
    super(snackBar);

    this.form.setValue({
      cod: dialogData.rowData.cod.toString(),
      descricao: dialogData.rowData.descricao,
      loc_estoque: dialogData.rowData.loc_estoque,
      id_un_de_medida: dialogData.rowData.un_de_medida.id.toString(),
    });

    if (dialogData.rowData.ativo === true) {
      this.active = true;
    }

    if (dialogData.rowData.estoque_atual === '0.0000') {
      this.deactivatable = true;
    }

    this.tags = dialogData.rowData.tags;
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

  public active = false;
  public deactivatable = false;
  public tags: Tag[];

  public selectData: UnDeMedida[] = [];

  // Métodos
  public openTags(
    id: number,
    tags: Tag[],
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(EditTagsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tags, id },
    });
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
        const formData = this.form.value as unknown as {
          cod: number;
          descricao: string;
          loc_estoque: string;
          id_un_de_medida: number;
        };

        this.materialTypesService
          .edit(formData, this.dialogData.rowData.id)
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

  public changeActive(
    ativo: boolean,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ) {
    const dialogRef = this.dialog.open(ConfirmInactivationComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: ativo,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialTypesService
          .updateActive(this.dialogData.rowData.id)
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

  public ngOnInit(): void {
    this.unsDeMedidaService.listAll().subscribe((responseData) => {
      this.selectData = responseData;
    });
  }
}
