import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, InfoCard, HistoryRow } from 'src/app/interfaces';
import { HistoryService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { CommentaryComponent } from 'src/app/shared';

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent extends PageComponent implements OnInit {
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

  id = 1;

  constructor(
    public dialog: MatDialog,
    private historyService: HistoryService,
    private route: ActivatedRoute
  ) {
    super();
  }

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

  openCommentary(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    commentary: string
  ): void {
    if (this.dialog != null) {
      this.dialog.open(CommentaryComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: { commentary },
      });
    }
  }

  updateInfoCards(): void {
    // TODO dinamizar
    this.infoCards[0].data = 'teste';
    this.infoCards[1].data = 'R$ ' + 1;
    this.infoCards[2].data = '20';
    this.infoCards[3].data = '1';
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
        this.loading = false;

      this.updateInfoCards();
    });
  }
}
