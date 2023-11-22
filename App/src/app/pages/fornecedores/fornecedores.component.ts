import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitle, FornecedoresData } from 'src/app/interfaces';
import {
  FornecedoresService,
  FornecedoresUpdaterService,
} from 'src/app/services';
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
    private tableUpdaterService: FornecedoresUpdaterService,
    private fornecedoresService: FornecedoresService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
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

  public doSearch(): void {
    if (this.search) {
      this.router.navigate(['fornecedores/page/1']);
      this.updateTableData(this.page, this.search);
      this.showSearchError = true;
    } else {
      this.updateTableData(this.page);
      this.showSearchError = false;
    }
  }

  public clearSearchValue() {
    this.search = null;
    this.refreshTable();
  }

  private updateTableData(page: number, search: string | null = null): void {
    this.tableData = [];
    this.loading = true;

    const observable = search
      ? this.fornecedoresService.listPerPage(page, search)
      : this.fornecedoresService.listPerPage(page);

    observable.subscribe((responseData) => {
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
    this.updateTableData(this.page, this.search);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page, this.search);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
