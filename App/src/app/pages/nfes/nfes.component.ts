import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
    private dialog: MatDialog,
    private nfesService: NfesService,
    private route: ActivatedRoute,
    private tableUpdaterService: NfesUpdaterService
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

  private updateTableData(page: number): void {
    this.tableData = [];
    this.loading = true;
    this.nfesService.listPerPage(page).subscribe((responseData) => {
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
