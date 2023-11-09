import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PageTitle,
  RequestListingRow,
} from 'src/app/interfaces';
import { RequestListingService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss'],
})
export class RequestListingComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--sucesso-2)',
    icon: 'file_download',
    title: 'Gerir Solicitações de Compra',
    searchLabel: 'Pesquisar por Solicitante',
    searchBox: true,
    adjustButton: false,
  };

  tableData: RequestListingRow[] = [];

  constructor(
    private requestListingService: RequestListingService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

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
