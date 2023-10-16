import { TableColumn } from './../../interfaces/table-column';
import { InfoCard } from 'src/app/interfaces/info-card';
import { PageTitle } from './../../interfaces/page-title';
import { Component } from '@angular/core';

@Component({
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'inventory_2',
    title: 'Inventário de Reagentes e Materiais',
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
      data: '-',
    },
    {
      iconColor: '',
      icon: 'data_usage',
      title: 'Mais Utilizado',
      data: '-',
    },
  ];

  tableColumns: TableColumn[] = [
    {
      title: 'Código',
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
      ]
    },
  ]
}
