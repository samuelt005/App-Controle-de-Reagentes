import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitle, NfesData } from 'src/app/interfaces';
import { NfesService, NfesUpdaterService } from 'src/app/services';
import { EditNfeComponent } from './dialogs/edit-nfe/edit-nfe.component';
import { NewNfeComponent } from './dialogs/new-nfe/new-nfe.component';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './nfes.component.html',
  styleUrls: ['./nfes.component.scss'],
})
export class NfesComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private tableUpdaterService: NfesUpdaterService,
    private nfesService: NfesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'paid',
    title: 'Gerir Notas Fiscais de Compra',
  };

  public tableData: NfesData[] = [];

  // Métodos
  public openEditItem(
    rowData: NfesData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    console.log(rowData);
    this.dialog.open(EditNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: rowData,
    });
  }

  public openNewItem(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public doSearch(): void {
    if (this.search) {
      this.router.navigate(['nfes/page/1']);
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
      ? this.nfesService.listPerPage(page, search)
      : this.nfesService.listPerPage(page);

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
