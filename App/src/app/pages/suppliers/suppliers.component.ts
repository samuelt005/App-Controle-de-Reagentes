import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  PageTitle,
  SuppliersRow,
  PaginatorData,
  ListingRow,
} from 'src/app/interfaces';
import { SuppliersService } from 'src/app/services';
import { EditTypeComponent } from '../material-types/dialogs/edit-type/edit-type.component';
import { NewTypeComponent } from '../material-types/dialogs/new-type/new-type.component';
import { PageComponent } from 'src/app/shared';

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
    rowData: ListingRow
  ): void {
    this.dialog.open(EditTypeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewTypeComponent, {
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
