import { Component } from '@angular/core';
import { PageTitle } from 'src/app/interfaces/page-title';

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
  dataInputs: any[] = [];

  addNewSection() {
    this.dataInputs.push({});
  }

  deleteSection(index: number) {
    this.dataInputs.splice(index, 1);
  }

  saveWriteOff() {}
}
