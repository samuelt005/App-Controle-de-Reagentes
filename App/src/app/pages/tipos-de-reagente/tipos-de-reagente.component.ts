import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, ListagemData } from 'src/app/interfaces';
import {
  TiposDeReagenteService,
  TiposDeReagenteUpdaterService,
} from 'src/app/services';
import { EditTiposDeReagenteComponent } from './dialogs/edit/edit-tipos-de-reagente.component';
import { NewTiposDeReagenteComponent } from './dialogs/new/new-tipos-de-reagente.component';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './tipos-de-reagente.component.html',
  styleUrls: ['./tipos-de-reagente.component.scss'],
})
export class TiposDeReagenteComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private dialog: MatDialog,
    private materialTypesService: TiposDeReagenteService,
    private route: ActivatedRoute,
    private tableUpdaterService: TiposDeReagenteUpdaterService
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'assignment',
    title: 'Manter Reagentes e Materiais',
  };

  public tableData: ListagemData[] = [];

  // Métodos
  public openEditItem(
    rowData: ListagemData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(EditTiposDeReagenteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  public openNewItem(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewTiposDeReagenteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  private updateTableData(page: number): void {
    this.tableData = [];
    this.loading = true;
    this.materialTypesService.listPerPage(page).subscribe((responseData) => {
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
