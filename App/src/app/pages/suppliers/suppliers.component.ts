import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, SuppliersRow } from 'src/app/interfaces';
import { SuppliersService, SuppliersUpdaterService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { NewSupplierComponent } from './dialogs/new-supplier/new-supplier.component';
import { EditSupplierComponent } from './dialogs/edit-supplier/edit-supplier.component';

@Component({
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'contacts',
    title: 'Gerir Fornecedores',
    searchLabel: 'Pesquisar por Razão Social ou CNPJ',
    searchBox: true,
    adjustButton: false,
  };

  suppliersTableData: SuppliersRow[] = [];

  constructor(
    private dialog: MatDialog,
    private suppliersService: SuppliersService,
    private route: ActivatedRoute,
    private tableUpdaterService: SuppliersUpdaterService
  ) {
    super();
  }

  openEditItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    rowData: SuppliersRow
  ): void {
    this.dialog.open(EditSupplierComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewSupplierComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  private updateTableData(page: number): void {
    this.suppliersService.listPerPage(page).subscribe((responseData) => {
      const { currentPage, totalPages, totalItems } = responseData;
      this.paginatorData = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalItems,
      };
      this.suppliersTableData = responseData.data;
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
