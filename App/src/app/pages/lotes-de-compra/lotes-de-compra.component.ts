import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, LotesDeCompraData } from 'src/app/interfaces';
import {
  LotesDeCompraService,
  LotesDeCompraUpdaterService,
} from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { NewLotesDeCompraComponent } from './dialogs/new/new-lotes-de-compra.component';
import { EditLotesDeCompraComponent } from './dialogs/edit/edit-lotes-de-compra.component';

@Component({
  templateUrl: './lotes-de-compra.component.html',
  styleUrls: ['./lotes-de-compra.component.scss'],
})
export class LotesDeCompraComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    public dialog: MatDialog,
    private lotsService: LotesDeCompraService,
    private route: ActivatedRoute,
    private tableUpdaterService: LotesDeCompraUpdaterService
  ) {
    super();
  }
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'shopping_bag',
    title: 'Gerir Lotes de Compra',
  };

  // Atributos
  public tableData: LotesDeCompraData[] = [];

  // Métodos
  public openEditItem(
    rowData: LotesDeCompraData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(EditLotesDeCompraComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  public openNewItem(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewLotesDeCompraComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  private updateTableData(page: number): void {
    this.tableData = [];
    this.loading = true;
    this.lotsService.listPerPage(page).subscribe((responseData) => {
      const { currentPage, totalPages, totalItems } = responseData;
      this.paginatorData = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalItems,
      };
      this.tableData = responseData.data;
      this.loading = false;
    });
  }

  private refreshTable(): void {
    this.updateTableData(this.page);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
