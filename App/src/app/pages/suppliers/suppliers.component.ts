import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, SuppliersRow, PaginatorData } from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';
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
  suppliersPage = 1;

  suppliersPaginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  constructor(
    private dialog: MatDialog,
    private suppliersService: SuppliersService,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.suppliersPage = Number(params.get('page'));

      this.suppliersService
        .listPerPage(this.suppliersPage)
        .subscribe((responseData) => {
          const { currentPage, totalPages, totalItems } = responseData;
          this.suppliersPaginatorData = {
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
          };
          this.suppliersTableData = responseData.data;
        });
    });
  }
}
