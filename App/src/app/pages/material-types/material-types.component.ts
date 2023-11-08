import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces/page-title';
import { EditTagsComponent } from './dialogs/edit-tags/edit-tags.component';
import { NewTypeComponent } from './dialogs/new-type/new-type.component';
import { EditTypeComponent } from './dialogs/edit-type/edit-type.component';
import { ConfirmInactivationComponent } from './dialogs/confirm-inactivation/confirm-inactivation.component';
import { ListingRow } from 'src/app/interfaces/tables/listing-row';
import { PaginatorData } from 'src/app/interfaces/paginator-data';
import { MaterialTypesService } from 'src/app/services/material-types/material-types.service';
import { ActivatedRoute } from '@angular/router';
import { NewTags } from 'src/app/interfaces/tables/new-tags';

@Component({
  templateUrl: './material-types.component.html',
  styleUrls: ['./material-types.component.scss'],
})
export class MaterialTypesComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'assignment',
    title: 'Manter Reagentes e Materiais',
    searchLabel: 'Pesquisar por Código ou Descrição',
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
