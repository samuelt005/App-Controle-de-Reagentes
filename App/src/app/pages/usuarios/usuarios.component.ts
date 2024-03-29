import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitle, UsuariosData } from 'src/app/interfaces';
import { UsuariosService, UsuariosUpdaterService } from 'src/app/services';
import { PageComponent } from 'src/app/shared';
import { EditUsuarioComponent } from './dialogs/edit/edit-usuario.component';
import { NewUsuarioComponent } from './dialogs/new/new-usuario.component';
import { ImportUsuarioComponent } from './dialogs/import/import-usuario.component';

@Component({
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent extends PageComponent implements OnInit {
  // Construtor
  constructor(
    private tableUpdaterService: UsuariosUpdaterService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'manage_accounts',
    title: 'Gerir Usuários',
  };

  public tableData: UsuariosData[] = [];

  // Métodos
  public openEditItem(
    rowData: UsuariosData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(EditUsuarioComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: rowData,
    });
  }

  public openImportItems(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(ImportUsuarioComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public openNewItem(
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(NewUsuarioComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public doSearch(): void {
    if (this.search) {
      this.router.navigate(['usuarios/page/1']);
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
      ? this.usuariosService.listPerPage(page, search)
      : this.usuariosService.listPerPage(page);

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
    this.openImportItems();
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));
      this.updateTableData(this.page, this.search);
    });

    this.tableUpdaterService.getUpdateObservable().subscribe(() => {
      this.refreshTable();
    });
  }
}
