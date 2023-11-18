import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from 'src/app/interfaces';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends DialogComponent implements OnInit {
  // Construtor
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: UserData,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);

    this.userData.nome = dialogData.nome;
    this.userData.ra = dialogData.ra;
    this.userData.cpf = dialogData.cpf
      .toString()
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    this.userData.email = dialogData.email;
    this.userData.perfil = dialogData.perfil;
  }

  // Atributos
  public userData = {
    nome: '',
    ra: '',
    cpf: '',
    email: '',
    perfil: '',
  };

  // Métodos
  public openPasswordChanging(
    id = this.dialogData.id,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(ChangePasswordComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: id,
    });
  }

  // TODO adicionar alteração de email

  ngOnInit(): void {
    console.log('');
  }
}
