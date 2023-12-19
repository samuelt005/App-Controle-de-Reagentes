import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  PageTitle,
  Card,
  ListagemData,
  FiltersValue,
} from 'src/app/interfaces';
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
    private tableUpdaterService: ListagemUpdaterService,
    private listagemService: ListagemService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private router: Router
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

  public filtersValue: FiltersValue = {
    search: null,
    un: null,
    tag: null,
    qtdMin: null,
    qtdMax: null,
    vlrUnitMin: null,
    vlrUnitMax: null,
    vlrTotMin: null,
    vlrTotMax: null,
    loc: null,
  };

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
      this.updateTableData(this.page, this.filtersValue);
      this.showSearchError = true;
    } else {
      this.updateTableData(this.page, this.filtersValue);
      this.showSearchError = false;
    }
  }

  public clearSearchValue() {
    this.filtersValue.search = null;
    this.refreshTable();
  }

  public handleFiltering(filters: FiltersValue) {
    this.filtersValue.un = filters.un;
    this.filtersValue.tag = filters.tag;
    this.filtersValue.qtdMin = filters.qtdMin;
    this.filtersValue.qtdMax = filters.qtdMax;
    this.filtersValue.vlrUnitMin = filters.vlrUnitMin;
    this.filtersValue.vlrUnitMax = filters.vlrUnitMax;
    this.filtersValue.vlrTotMin = filters.vlrTotMin;
    this.filtersValue.vlrTotMax = filters.vlrTotMax;
    this.filtersValue.loc = filters.loc;
    this.doSearch();
  }

  private updateTableData(page: number, filtersValue: FiltersValue): void {
    this.tableData = [];
    this.loading = true;

    this.listagemService
      .listPerPageFiltered(page, filtersValue)
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

    this.cardsService.getListagemData().subscribe((responseData) => {
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
    this.updateTableData(this.page, this.filtersValue);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page, this.filtersValue);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
