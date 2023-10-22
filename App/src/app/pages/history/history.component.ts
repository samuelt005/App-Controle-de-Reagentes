import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoCard } from 'src/app/interfaces/info-card';
import { PageTitle } from 'src/app/interfaces/page-title';
import { HistoryRow } from 'src/app/interfaces/tables/history-row';
import { CommentaryComponent } from 'src/app/shared/dialogs/commentary/commentary.component';

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'history',
    title: 'Histórico do Item',
    searchBox: false,
    adjustButton: true,
  };

  infoCards: InfoCard[] = [
    {
      iconColor: '',
      icon: 'inventory_2',
      title: 'Descrição',
      data: '-',
    },
    {
      iconColor: '',
      icon: 'calculate',
      title: 'Valor Total',
      data: 'R$ -',
    },
    {
      iconColor: 'var(--sucesso-2)',
      icon: 'file_download',
      title: 'Total de Entradas',
      data: '-',
    },
    {
      iconColor: 'var(--secundaria-2)',
      icon: 'file_upload',
      title: 'Total de Saídas',
      data: '-',
    },
  ];

  tableRow: HistoryRow[] = [
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'saida',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'entrada',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Lorem ipsum Comentario',
    },
    {
      tipo: 'ajuste',
      data: '30/10/2022',
      forn_resp: 'Fulano de Tal',
      nfe: 30,
      valor_tot: 12,
      quant: 4,
      un: 'Kg',
      commentary: 'Teste ultimo item',
    },
  ];

  getIconType(i: number): string {
    switch (this.tableRow[i].tipo) {
      case 'entrada':
        return 'file_download';
      case 'saida':
        return 'file_upload';
      case 'ajuste':
        return 'construction';
      default:
        return 'icone-padrão';
    }
  }

  getIconColor(i: number): string {
    switch (this.tableRow[i].tipo) {
      case 'entrada':
        return 'var(--sucesso-2)';
      case 'saida':
        return 'var(--secundaria-2)';
      case 'ajuste':
        return 'var(--aviso-2)';
      default:
        return 'gray';
    }
  }

  constructor(public dialog: MatDialog) {}

  openCommentary(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    commentary: string
  ): void {
    this.dialog.open(CommentaryComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { commentary },
    });
  }
}
