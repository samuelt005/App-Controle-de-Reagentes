import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces';
import { NewCommentaryComponent, PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './dar-baixa.component.html',
  styleUrls: ['./dar-baixa.component.scss'],
})
export class DarBaixaComponent extends PageComponent {
  // Construtor
  constructor(public dialog: MatDialog) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'file_upload',
    title: 'Cadastrar Baixa de Reagentes e Materiais',
  };

  // Métodos
  public saveWriteOff(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewCommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
