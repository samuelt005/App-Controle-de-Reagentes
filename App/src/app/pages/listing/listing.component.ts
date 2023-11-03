import { InfoCard } from 'src/app/interfaces/info-card';
import { PageTitle } from './../../interfaces/page-title';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposDeReagente } from 'src/app/interfaces/tables/tipos-de-reagente';
import { TiposDeReagenteService } from 'src/app/services/tipos-de-reagente/tipos-de-reagente.service';
import { InfoCardsService } from 'src/app/services/info-cards/info-cards.service';

@Component({
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'inventory_2',
    title: 'Inventário de Reagentes e Materiais',
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

  tableData: TiposDeReagente[] = [];
  totalItems: string = '-';
  totalValue: string = '-';
  mostUsed: string = '-';
  page: number = 1;

  constructor(
    private tiposDeReagenteService: TiposDeReagenteService,
    private infoCardsService: InfoCardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  openHistory() {
    setTimeout(() => {
      this.router.navigate(['/history']);
    }, 500);
  }

  updateInfoCards() {
    this.infoCards[0].data = this.totalItems.toString();
    this.infoCards[1].data = 'R$' + this.totalValue;
    this.infoCards[2].data = this.mostUsed;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.tiposDeReagenteService.listPerPage(this.page).subscribe((data) => {
        this.tableData = data;
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
