import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  Card,
  ItemSolicitacao,
  PageTitle,
  SolicitacaoPageData,
} from 'src/app/interfaces';
import {
  CardsService,
  DetalhesSolicitacaoService,
  DetalhesSolicitacaoUpdaterService,
  SolicitacoesService,
} from 'src/app/services';
import { CommentaryComponent, PageComponent } from 'src/app/shared';
import { AcceptComponent } from './dialogs/accept/accept.component';
import { EditItemComponent } from './dialogs/edit/edit-item.component';

@Component({
  templateUrl: './detalhes-solicitacao.component.html',
  styleUrls: ['./detalhes-solicitacao.component.scss'],
})
export class DetalhesSolicitacaoComponent
  extends PageComponent
  implements OnInit
{
  // Construtor
  constructor(
    private tableUpdaterService: DetalhesSolicitacaoUpdaterService,
    private detalhesSolicitacaoService: DetalhesSolicitacaoService,
    private solicitacoesService: SolicitacoesService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'info',
    title: 'Detalhes da Solicitação',
  };

  public infoCards: Card[] = [
    {
      iconColor: '',
      icon: 'inventory_2',
      title: 'Nº do Pedido',
      data: '-',
    },
    {
      iconColor: '',
      icon: 'event',
      title: 'Data do Pedido',
      data: '-',
    },
    {
      iconColor: '',
      icon: 'assignment_turned_in',
      title: 'Status Geral',
      data: '-',
      isStatus: true,
    },
    {
      iconColor: '',
      icon: 'perm_identity',
      title: 'Solicitante',
      data: '-',
    },
  ];

  public tableData: ItemSolicitacao[] = [];

  private id = 1;
  private commentary = '';

  // Métodos
  public openCommentary(
    commentary = this.commentary,
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

  public openItemDialog(
    row: ItemSolicitacao,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    if (row.recusado === null) {
      this.dialog.open(AcceptComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: row,
      });
    }
    if (row.recusado === false) {
      this.dialog.open(EditItemComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: row,
      });
    }
  }

  public getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Em Análise';
      case 2:
        return 'Sem Lote';
      case 3:
        return 'Sem NF-e';
      case 4:
        return 'Concluído';
      case 5:
        return 'Recusado';
      default:
        return '-';
    }
  }

  public getStatusColor(status: number): string {
    switch (status) {
      case 1:
        return 'var(--aviso-2)';
      case 2:
        return 'var(--informativo-2)';
      case 3:
        return 'var(--informativo-2)';
      case 4:
        return 'var(--sucesso-2)';
      case 5:
        return 'var(--cinza-2)';
      default:
        return 'black';
    }
  }

  public setStatus(): void {
    this.tableData.forEach((item) => {
      if (item.recusado === null) {
        item.status = 1;
        return;
      }

      if (item.recusado === true) {
        item.status = 5;
        return;
      }

      if (item.lote === null && item.nfe === null) {
        item.status = 2;
        return;
      }

      if (item.lote !== null && item.nfe === null) {
        item.status = 3;
        return;
      }

      if (item.lote !== null && item.nfe !== null) {
        item.status = 4;
        return;
      }
    });
  }

  private updateSolicitacaoStatus(id: number, status: number) {
    this.solicitacoesService.updateStatus(id, status).subscribe({
      complete: () => {
        return;
      },
      error: (e) => {
        console.error('Ocorreu um erro:', e);
      },
    });
  }

  private checkSolicitacaoStatus(solicitacaoData: SolicitacaoPageData): void {
    const totalItemsScore = this.tableData.length * 2;
    let itemsScore = 0;

    this.tableData.forEach((item) => {
      if (item.status === 2 || item.status === 3) {
        itemsScore++;
      } else if (item.status === 4 || item.status === 5) {
        itemsScore += 2;
      }
    });

    if (itemsScore === 0) {
      if (solicitacaoData.status !== 1) {
        this.infoCards[2].data = '1';
        this.updateSolicitacaoStatus(solicitacaoData.id, 1);
      }
    } else if (itemsScore < totalItemsScore) {
      if (solicitacaoData.status !== 2) {
        this.infoCards[2].data = '2';
        this.updateSolicitacaoStatus(solicitacaoData.id, 2);
      }
    } else if (itemsScore === totalItemsScore) {
      if (solicitacaoData.status !== 3) {
        this.infoCards[2].data = '3';
        this.updateSolicitacaoStatus(solicitacaoData.id, 3);
      }
    }
  }

  private updateTableData(id: number): void {
    this.tableData = [];
    this.loading = true;

    this.detalhesSolicitacaoService
      .listItems(this.id)
      .subscribe((responseData) => {
        this.tableData = responseData;
        this.setStatus();
        this.loading = false;
      });

    this.cardsService.getSolicitacaoData(id).subscribe((responseData) => {
      this.infoCards[0].data = responseData.id.toString();
      this.infoCards[1].data = this.getFormattedDate(
        responseData.data.toString()
      );
      this.infoCards[2].data = responseData.status.toString();
      this.infoCards[3].data = responseData.responsavel;
      this.commentary = responseData.comentario;
      this.checkSolicitacaoStatus(responseData);
    });
  }

  private refreshTable(): void {
    this.updateTableData(this.id);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.updateTableData(this.id);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
