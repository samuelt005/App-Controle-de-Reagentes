import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, Card, HistoricosData } from 'src/app/interfaces';
import {
  HistoricoService,
  CardsService,
  HistoricoUpdaterService,
} from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { CommentaryComponent } from 'src/app/shared';
import { AdjustmentComponent } from './adjustment/adjustment.component';

@Component({
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private tableUpdaterService: HistoricoUpdaterService,
    private historicoService: HistoricoService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'history',
    title: 'Histórico do Item',
  };

  public infoCards: Card[] = [
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

  public tableData: HistoricosData[] = [];

  private id = 1;
  private unDeMedida = '';

  // Métodos
  public getIconType(i: number): string {
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

  public getIconColor(i: number): string {
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

  public getTotalValue(row: HistoricosData) {
    return parseFloat(row.valor_tot).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public getQuanty(row: HistoricosData) {
    if (row.qtd_rec) {
      return (row.qtd_rec / row.tipo.un_de_medida.peso).toLocaleString(
        'pt-BR',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    } else {
      return (row.qtd_mov / row.tipo.un_de_medida.peso).toLocaleString(
        'pt-BR',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    }
  }

  public openCommentary(
    commentary: string,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    if (this.dialog != null) {
      this.dialog.open(CommentaryComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: commentary,
      });
    }
  }

  public openAdjustment(
    id = this.id,
    unDeMedida = this.unDeMedida,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(AdjustmentComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id, unDeMedida },
    });
  }

  private updateTableData(page: number, id: number): void {
    this.tableData = [];
    this.loading = true;

    this.historicoService.listPerPage(page, id).subscribe((responseData) => {
      const { currentPage, totalPages, totalItems } = responseData;
      this.paginatorData = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalItems,
      };
      this.tableData = responseData.data;
      this.loading = false;
    });

    this.cardsService.getHistoricoData(id).subscribe((responseData) => {
      this.infoCards[0].data = responseData.desc;
      if (responseData.total_value !== null) {
        this.infoCards[1].data =
          'R$ ' +
          responseData.total_value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
      }
      this.infoCards[2].data = responseData.total_entries.toString();
      this.infoCards[3].data = responseData.total_outputs.toString();
      this.unDeMedida = responseData.un_de_medida.nome;
    });
  }

  private refreshTable(): void {
    this.updateTableData(this.page, this.id);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.id = Number(params.get('id'));
      this.updateTableData(this.page, this.id);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
