import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces';
import { NewCommentaryComponent, PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent extends PageComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Cadastrar Solicitação de Compra',
    searchBox: false,
    adjustButton: false,
  };

  constructor(public dialog: MatDialog) {
    super();
  }

  saveRequest(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewCommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
