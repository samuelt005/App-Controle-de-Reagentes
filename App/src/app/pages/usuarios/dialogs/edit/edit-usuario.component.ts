import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfisData, UsuariosData } from 'src/app/interfaces';
import {
  PerfisService,
  UsuariosService,
  UsuariosUpdaterService,
} from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cpfValidator } from 'src/app/utils';

@Component({
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss'],
})
export class EditUsuarioComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: UsuariosData,
    private tableUpdaterService: UsuariosUpdaterService,
    private usuariosService: UsuariosService,
    private perfisService: PerfisService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);

    this.form.setValue({
      nome: dialogData.nome,
      email: dialogData.email,
      ra: dialogData.ra,
      cpf: dialogData.cpf.toString(),
      id_perfil: dialogData.perfil.id,
    });

    if (dialogData.confirmed_email) {
      this.form.get('email')?.disable();
    }
  }

  // Atributos
  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: false }, [
      Validators.email,
      Validators.required,
    ]),
    ra: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [cpfValidator()]),
    id_perfil: new FormControl('', [Validators.required]),
  });

  public selectData: PerfisData[] = [];

  // Métodos
  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          nome: string;
          email: string;
          ra: string;
          cpf: string;
        }; // TODO ver se tem uma maneira melhor de fazer esta parte

        this.usuariosService.edit(formData, this.dialogData.id).subscribe({
          complete: () => {
            this.openSnackBar(false);
            this.tableUpdaterService.updateTable();
          },
          error: (e) => {
            if (e.status === 400) {
              this.openSnackBar(true, `${e.error.message}`);
            } else {
              this.openSnackBar(true);
              console.error('Ocorreu um erro:', e);
            }
          },
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }

  public ngOnInit(): void {
    this.perfisService.listAll().subscribe((responseData) => {
      this.selectData = responseData.data;
    });
  }
}
