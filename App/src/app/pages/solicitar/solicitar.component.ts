import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces';
import { NewCommentaryComponent, PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss'],
})
export class SolicitarComponent extends PageComponent {
  // Construtor
  constructor(public dialog: MatDialog) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Cadastrar Solicitação de Compra',
  };

  // Métodos
  public saveRequest(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewCommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
