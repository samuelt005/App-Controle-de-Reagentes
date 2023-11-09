import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitle, InfoCard, ListingRow } from 'src/app/interfaces';
import { ListingService, InfoCardsService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'inventory_2',
    title: 'Inventário de Reagentes e Materiais',
    searchLabel: 'Pesquisar por Código ou Descrição',
    searchBox: true,
    adjustButton: false,
  };

  infoCards: InfoCard[] = [
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

  tableData: ListingRow[] = [];
  totalItems = '-';
  totalValue = '-';
  mostUsed = '-';

  constructor(
    private listingService: ListingService,
    private infoCardsService: InfoCardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  openHistory(id: number): void {
    setTimeout(() => {
      this.router.navigate([`history/item/${id}/page/1`]);
    }, 500);
  }

  updateInfoCards(): void {
    this.infoCards[0].data = this.totalItems.toString();
    this.infoCards[1].data = 'R$ ' + this.totalValue;
    this.infoCards[2].data = this.mostUsed;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.listingService.listPerPage(this.page).subscribe((responseData) => {
        const { currentPage, totalPages, totalItems } = responseData;
        this.paginatorData = {
          currentPage: currentPage,
          totalPages: totalPages,
          totalItems: totalItems,
        };
        this.tableData = responseData.data;
      });

      this.infoCardsService
        .getItemsSum('TiposDeReagente', 'vlr_estoque')
        .subscribe((data) => {
          this.totalValue = data.toString();
          this.updateInfoCards();
        });

      this.infoCardsService.getActiveTypesCount().subscribe((data) => {
        this.totalItems = data.toString();
        this.updateInfoCards();
      });

      this.infoCardsService.getMostUsedCount().subscribe((data) => {
        this.mostUsed = data.toString();
        this.updateInfoCards();
      });
    });
  }
}
