import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces/page-title';
import { NewCommentaryComponent } from '../../shared/dialogs/new-commentary/new-commentary.component';

@Component({
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss'],
})
export class WriteOffComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'file_upload',
    title: 'Cadastrar Baixa de Reagentes e Materiais',
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

  saveWriteOff(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(NewCommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
