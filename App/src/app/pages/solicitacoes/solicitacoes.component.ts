import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitle, SolicitacoesData } from 'src/app/interfaces';
import {
  SolicitacoesService,
  SolicitacoesUpdaterService,
} from 'src/app/services';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
})
export class SolicitacoesComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private tableUpdaterService: SolicitacoesUpdaterService,
    private solicitacoesService: SolicitacoesService,
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
  public openDetails(id: number): void {
    setTimeout(() => {
      this.router.navigate([`solicitacao/${id}`]);
    }, 500);
  }

  public getStatus(status: number): string {
    switch (status) {
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

  public getStatusColor(status: number): string {
    switch (status) {
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

  public doSearch(): void {
    if (this.search) {
      this.router.navigate(['solicitacoes/page/1']);
      this.updateTableData(this.page, this.search);
      this.showSearchError = true;
    } else {
      this.updateTableData(this.page);
      this.showSearchError = false;
    }
  }

  public clearSearchValue() {
    this.search = null;
    this.refreshTable();
  }

  private updateTableData(page: number, search: string | null = null): void {
    this.tableData = [];
    this.loading = true;

    const observable = search
      ? this.solicitacoesService.listPerPage(page, search)
      : this.solicitacoesService.listPerPage(page);

    observable.subscribe((responseData) => {
      const { currentPage, totalPages, totalItems } = responseData;
      this.paginatorData = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalItems,
      };
      this.tableData = responseData.data;
      this.loading = false;
    });
  }

  private refreshTable(): void {
    this.updateTableData(this.page, this.search);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page, this.search);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
