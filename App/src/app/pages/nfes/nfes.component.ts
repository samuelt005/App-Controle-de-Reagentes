import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, NfesRow } from 'src/app/interfaces';
import { NfesService, NfesUpdaterService } from 'src/app/services';
import { EditNfeComponent } from './dialogs/edit-nfe/edit-nfe.component';
import { NewNfeComponent } from './dialogs/new-nfe/new-nfe.component';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './nfes.component.html',
  styleUrls: ['./nfes.component.scss'],
})
export class NfesComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'paid',
    title: 'Gerir Notas Fiscais de Compra',
    searchLabel: 'Pesquisar por Fornecedor ou Número',
    searchBox: true,
    adjustButton: false,
  };

  tableData: NfesRow[] = [];

  constructor(
    private dialog: MatDialog,
    private nfesService: NfesService,
    private route: ActivatedRoute,
    private tableUpdaterService: NfesUpdaterService
  ) {
    super();
  }

  openEditItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    rowData: NfesRow
  ): void {
    this.dialog.open(EditNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  private updateTableData(page: number): void {
    this.nfesService.listPerPage(page).subscribe((responseData) => {
      const { currentPage, totalPages, totalItems } = responseData;
      this.paginatorData = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalItems,
      };
      this.tableData = responseData.data;
    });
  }

  private refreshTable(): void {
    this.updateTableData(this.page);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
