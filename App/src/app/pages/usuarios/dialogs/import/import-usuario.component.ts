import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService, UsuariosUpdaterService } from 'src/app/services';
import { ConfirmSaveComponent, DialogComponent } from 'src/app/shared';
import { cpfValidator } from 'src/app/utils';
import readXlsxFile from 'read-excel-file';
import { NewUserData } from 'src/app/interfaces';

@Component({
  selector: 'app-import-usuario',
  templateUrl: './import-usuario.component.html',
  styleUrls: ['./import-usuario.component.scss'],
})
export class ImportUsuarioComponent extends DialogComponent {
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
  public file: File | null = null;
  public usersToImport: NewUserData[] = [];

  // Métodos
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      readXlsxFile(this.file)
        .then((rows) => {
          const data = rows.slice(1);
          data.forEach((row) => {
            const newUser = {
              nome: row[0].toString(),
              email: row[1].toString(),
              ra: row[2].toString(),
              cpf: row[3].toString(),
            };

            this.usersToImport.push(newUser);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  public saveData(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms',
    message = 'Os usuários não poderão ser excluídos!'
  ) {
    const dialogRef = this.dialog.open(ConfirmSaveComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
