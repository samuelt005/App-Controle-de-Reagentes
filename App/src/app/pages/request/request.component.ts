import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces/page-title';
import { NewCommentaryComponent } from 'src/app/shared/dialogs/new-commentary/new-commentary.component';

@Component({
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Cadastrar Solicitação de Compra',
    searchBox: false,
    adjustButton: false,
  };
  dataInputs: object[] = [];

  constructor(public dialog: MatDialog) {}

  addNewSection() {
    this.dataInputs.push({});
  }

  deleteSection(index: number) {
    this.dataInputs.splice(index, 1);
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
