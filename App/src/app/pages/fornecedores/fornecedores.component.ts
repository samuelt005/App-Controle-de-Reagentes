import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, FornecedoresData } from 'src/app/interfaces';
import { FornecedoresService, FornecedoresUpdaterService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { NewFornecedoresComponent } from './dialogs/new/new-fornecedores.component';
import { EditFornecedoresComponent } from './dialogs/edit/edit-fornecedores.component';

@Component({
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private dialog: MatDialog,
    private suppliersService: FornecedoresService,
    private route: ActivatedRoute,
    private tableUpdaterService: FornecedoresUpdaterService
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'contacts',
    title: 'Gerir Fornecedores',
  };

  public tableData: FornecedoresData[] = [];

  // Métodos
  public openEditItem(
    rowData: FornecedoresData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(EditFornecedoresComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  public openNewItem(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewFornecedoresComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  private updateTableData(page: number): void {
    this.tableData = [];
    this.loading = true;
    this.suppliersService.listPerPage(page).subscribe((responseData) => {
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
