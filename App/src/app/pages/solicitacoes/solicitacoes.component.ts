import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PageTitle,
  SolicitacoesData,
} from 'src/app/interfaces';
import { SolicitacoesService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
})
export class SolicitacoesComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private requestListingService: SolicitacoesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Gerir Solicitações de Compra',
  };

  public tableData: SolicitacoesData[] = [];

  // Métodos
  public getStatus(i: number): string {
    switch (this.tableData[i].status) {
      case 1:
        return 'Aguardando Liberação';
      case 2:
        return 'Incompleto';
      case 3:
        return 'Concluído';
      default:
        return 'PLACEHOLDER';
    }
  }

  public getStatusColor(i: number): string {
    switch (this.tableData[i].status) {
      case 1:
        return 'var(--aviso-2)';
      case 2:
        return 'var(--informativo-2)';
      case 3:
        return 'var(--sucesso-2)';
      default:
        return 'black';
    }
  }

  public openDetails() {
    setTimeout(() => {
      this.router.navigate(['/solicitacoes/page/1']);
    }, 500);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.requestListingService
        .listPerPage(this.page)
        .subscribe((responseData) => {
          const { currentPage, totalPages, totalItems } = responseData;
          this.paginatorData = {
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
          };
          this.tableData = responseData.data;
          this.loading = false;
        });
    });
  }
}