import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageTitle } from "src/app/interfaces";
import { NewCommentaryComponent, PageComponent } from "src/app/shared";

@Component({
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss'],
})
export class WriteOffComponent extends PageComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'file_upload',
    title: 'Cadastrar Baixa de Reagentes e Materiais',
    searchBox: false,
    adjustButton: false,
  };

  constructor(public dialog: MatDialog) {
    super();
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
