import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitle, Card, ListagemData } from 'src/app/interfaces';
import {
  ListagemService,
  CardsService,
  ListagemUpdaterService,
} from 'src/app/services';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private listingService: ListagemService,
    private infoCardsService: CardsService,
    private router: Router,
    private tableUpdaterService: ListagemUpdaterService,
    private route: ActivatedRoute
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'inventory_2',
    title: 'Inventário de Reagentes e Materiais',
  };

  public infoCards: Card[] = [
    {
      iconColor: '',
      icon: 'format_list_bulleted',
      title: 'Total de Itens',
      data: '-',
    },
    {
      iconColor: '',
      icon: 'calculate',
      title: 'Valor total',
      data: 'R$ -',
    },
    {
      iconColor: '',
      icon: 'data_usage',
      title: 'Mais Utilizado',
      data: '-',
    },
  ];

  public tableData: ListagemData[] = [];

  // Métodos
  public openHistory(id: number): void {
    setTimeout(() => {
      this.router.navigate([`historico/item/${id}/page/1`]);
    }, 500);
  }

  public doSearch(): void {
    if (this.search) {
      this.router.navigate(['listagem/page/1']);
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
      ? this.listingService.listPerPage(page, search)
      : this.listingService.listPerPage(page);

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

    this.infoCardsService.getListagemData().subscribe((responseData) => {
      this.infoCards[0].data = responseData.total_items.toString();
      if (responseData.total_value !== null) {
        this.infoCards[1].data =
          'R$ ' +
          responseData.total_value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
      }
      this.infoCards[2].data = responseData.most_used;
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
