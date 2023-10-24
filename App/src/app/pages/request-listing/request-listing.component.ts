import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitle } from 'src/app/interfaces/page-title';
import { RequestRow } from 'src/app/interfaces/tables/request-row';

@Component({
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss'],
})
export class RequestListingComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Gerir Solicitações de Compra',
    searchBox: false,
    adjustButton: false,
  };

  tableRow: RequestRow[] = [
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 1,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 2,
        solicitante: "Fulano de Tal"
    },
    {
        numero: 123,
        data: "30/12/2021",
        status: 3,
        solicitante: "Fulano de Tal"
    },
  ];

  constructor(private router: Router) {}

  getStatus(i: number): string {
    switch (this.tableRow[i].status) {
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

  getStatusColor(i: number): string {
    switch (this.tableRow[i].status) {
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

  openDetails() {
    this.router.navigate(['/requestlisting']);
  }
}
