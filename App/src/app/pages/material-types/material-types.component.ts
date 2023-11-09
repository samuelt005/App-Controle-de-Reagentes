import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, ListingRow, NewTags } from 'src/app/interfaces';
import { MaterialTypesService } from 'src/app/services';
import { ConfirmInactivationComponent } from './dialogs/confirm-inactivation/confirm-inactivation.component';
import { EditTagsComponent } from './dialogs/edit-tags/edit-tags.component';
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
    private route: ActivatedRoute
  ) {
    super();
  }

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
