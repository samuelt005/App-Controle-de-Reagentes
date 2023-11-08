import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle } from 'src/app/interfaces/page-title';
import { PaginatorData } from 'src/app/interfaces/paginator-data';
import { ListingRow } from 'src/app/interfaces/tables/listing-row';
import { NewTags } from 'src/app/interfaces/tables/new-tags';
import { MaterialTypesService } from 'src/app/services/material-types/material-types.service';
import { ConfirmInactivationComponent } from '../material-types/dialogs/confirm-inactivation/confirm-inactivation.component';
import { EditTagsComponent } from '../material-types/dialogs/edit-tags/edit-tags.component';
import { EditTypeComponent } from '../material-types/dialogs/edit-type/edit-type.component';
import { NewTypeComponent } from '../material-types/dialogs/new-type/new-type.component';

@Component({
  templateUrl: './suppliers-lots.component.html',
  styleUrls: ['./suppliers-lots.component.scss'],
})
export class SuppliersLotsComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'assignment',
    title: 'Manter Reagentes e Materiais',
    searchBox: true,
    adjustButton: false,
  };

  tableData: ListingRow[] = [];
  page = 1;

  paginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  constructor(
    private dialog: MatDialog,
    private materialTypesService: MaterialTypesService,
    private route: ActivatedRoute
  ) {}

  openTags(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    tags: NewTags[]
  ): void {
    this.dialog.open(EditTagsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tags },
    });
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

  confirmInactivation(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    valor_estoque: number
  ): void {
    if (valor_estoque === 0) {
      this.dialog.open(ConfirmInactivationComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.materialTypesService
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
