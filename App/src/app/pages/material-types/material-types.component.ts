import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, ListingRow } from 'src/app/interfaces';
import {
  MaterialTypesService,
  MaterialTypesUpdaterService,
} from 'src/app/services';
import { EditTypeComponent } from './dialogs/edit-type/edit-type.component';
import { NewTypeComponent } from './dialogs/new-type/new-type.component';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './material-types.component.html',
  styleUrls: ['./material-types.component.scss'],
})
export class MaterialTypesComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'assignment',
    title: 'Manter Reagentes e Materiais',
    searchLabel: 'Pesquisar por Código ou Descrição',
    searchBox: true,
    adjustButton: false,
  };

  tableData: ListingRow[] = [];

  constructor(
    private dialog: MatDialog,
    private materialTypesService: MaterialTypesService,
    private route: ActivatedRoute,
    private tableUpdaterService: MaterialTypesUpdaterService
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

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  private updateTableData(page: number): void {
    this.materialTypesService.listPerPage(page).subscribe((responseData) => {
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
