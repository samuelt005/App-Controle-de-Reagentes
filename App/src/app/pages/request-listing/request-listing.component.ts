import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitle } from 'src/app/interfaces/page-title';
import { PaginatorData } from 'src/app/interfaces/paginator-data';
import { RequestListingRow } from 'src/app/interfaces/tables/request-listing-row';
import { RequestListingService } from 'src/app/services/requestlisting/request-listing.service';

@Component({
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss'],
})
export class RequestListingComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Gerir Solicitações de Compra',
    searchLabel: 'Pesquisar por Solicitante',
    searchBox: true,
    adjustButton: false,
  };

  tableData: RequestListingRow[] = [];

  paginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  page = 1;

  constructor(
    private requestListingService: RequestListingService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getStatus(i: number): string {
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

  getStatusColor(i: number): string {
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

  getFormattedDate(dateTimeStr: string): string {
    const parts = dateTimeStr.split('T')[0].split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}/${month}/${year}`;
  }

  openDetails() {
    setTimeout(() => {
      this.router.navigate(['/requestlisting/page/1']);
    }, 500);
  }

  ngOnInit(): void {
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
        });
    });
  }
}
