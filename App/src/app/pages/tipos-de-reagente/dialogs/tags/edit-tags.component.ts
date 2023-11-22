import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsDialog } from 'src/app/interfaces';
import {
  TiposDeReagenteService,
  TiposDeReagenteUpdaterService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';

@Component({
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss'],
})
export class EditTagsComponent extends DialogComponent {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: TagsDialog,
    private tableUpdaterService: TiposDeReagenteUpdaterService,
    private tiposDeReagenteService: TiposDeReagenteService,
    public dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);

    this.form.setValue({
      em: this.isTagPresent('em'),
      pf: this.isTagPresent('pf'),
      pc: this.isTagPresent('pc'),
      eb: this.isTagPresent('eb'),
    });
  }

  // Atributos
  public form = new FormGroup({
    em: new FormControl(false),
    pf: new FormControl(false),
    pc: new FormControl(false),
    eb: new FormControl(false),
  });

  // Métodos
  private isTagPresent(tagSigla: string): boolean {
    return this.dialogData.tags.some((tag) => tag.sigla === tagSigla);
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
          em: boolean;
          pf: boolean;
          pc: boolean;
          eb: boolean;
        };

        this.tiposDeReagenteService
          .updateTags(formData, this.dialogData.id)
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
}
