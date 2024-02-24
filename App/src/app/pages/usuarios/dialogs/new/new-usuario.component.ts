import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService, UsuariosUpdaterService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cpfValidator } from 'src/app/utils';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.scss'],
})
export class NewUsuarioComponent extends DialogComponent {
  // Construtor
  constructor(
    private tableUpdaterService: UsuariosUpdaterService,
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  // Atributos
  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    ra: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [cpfValidator()]),
  });

  // Métodos
  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'O usuário não poderá ser excluído!'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.form.value as unknown as {
          nome: string;
          email: string;
          ra: string;
          cpf: string;
        }; // TODO ver se tem uma maneira melhor de fazer esta parte

        this.usuariosService.addNew(formData).subscribe({
          complete: () => {
            this.openSnackBar(false);
            this.tableUpdaterService.updateTable();
          },
          error: (e) => {
            if (e.status === 400) {
              this.openSnackBar(
                true,
                `Já existe um usuário com o mesmo ${e.error.field}.`
              );
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
}
