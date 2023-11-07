import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InfoCard } from 'src/app/interfaces/info-card';
import { PageTitle } from 'src/app/interfaces/page-title';
import { PaginatorData } from 'src/app/interfaces/paginator-data';
import { HistoryRow } from 'src/app/interfaces/tables/history-row';
import { HistoryService } from 'src/app/services/history/history.service';
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

  tableData: HistoryRow[] = [];

  paginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };
  
  page: number = 1;
  id: number = 1;
  
  constructor(
    private historyService: HistoryService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  getIconType(i: number): string {
    switch (this.tableData[i].operacao) {
      case 1:
        return 'file_download';
      case 2:
        return 'file_upload';
      case 3:
        return 'construction';
      default:
        return 'icone-padrão';
    }
  }

  getIconColor(i: number): string {
    switch (this.tableData[i].operacao) {
      case 1:
        return 'var(--sucesso-2)';
      case 2:
        return 'var(--secundaria-2)';
      case 3:
        return 'var(--aviso-2)';
      default:
        return 'gray';
    }
  }

  updateInfoCards() {
    // TODO dinamizar
    this.infoCards[0].data = 'teste';
    this.infoCards[1].data = 'R$ ' + 1;
    this.infoCards[2].data = '20';
    this.infoCards[3].data = '1';
  }

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.id = Number(params.get('id'));

      this.historyService
        .listPerPage(this.page, this.id)
        .subscribe((responseData) => {
          const { currentPage, totalPages, totalItems } = responseData;
          this.paginatorData = {
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
          };
          this.tableData = responseData.data;
        });

      this.updateInfoCards();
    });
  }
}
