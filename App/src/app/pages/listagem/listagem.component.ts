import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  UserService,
  LoginService,
} from 'src/app/services';
import { NotificationComponent, PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent extends PageComponent implements OnInit, AfterViewInit {
  // Construtor
  constructor(
    private userService: UserService,
    private tableUpdaterService: ListagemUpdaterService,
    private listagemService: ListagemService,
    private loginService: LoginService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: MatSnackBar
  ) {
    super();
    const role = this.userService.getUserRole();
    if (role === 'Administrador') {
      this.isAdmin = true;
    }
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
      onlyAdmin: false,
    },
    {
      iconColor: '',
      icon: 'calculate',
      title: 'Valor total',
      data: 'R$ -',
      onlyAdmin: true,
    },
    {
      iconColor: '',
      icon: 'data_usage',
      title: 'Mais Utilizado',
      data: '-',
      onlyAdmin: false,
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
  public isAdmin = false;

  // Métodos
  public openHistory(id: number): void {
    if (this.isAdmin) {
      setTimeout(() => {
        this.router.navigate([`historico/item/${id}/page/1`]);
      }, 500);
    }
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

  public checkIsAdmin(card: Card) {
    if (card.onlyAdmin && !this.isAdmin) {
      return false;
    } else {
      return true;
    }
  }

  private checkValidatedEmail() {
    this.userService.checkEmailConfirmed().subscribe((responseData) => {
      if (!responseData) {
        const message = 'Seu e-mail ainda não foi confirmado.';
        const description = 'Por favor verifique sua caixa de entrada!';
        this.notification.openFromComponent(NotificationComponent, {
          data: { warning: true, message, description },
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        const message = 'Seja bem vindo de volta!';
        this.notification.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: { warning: false, message },
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
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

  public ngAfterViewInit(): void {
    this.loginService.getLoginSuccessObservable().subscribe(() => {
      this.checkValidatedEmail();
    });
  }
}
