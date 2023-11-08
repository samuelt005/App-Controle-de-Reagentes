import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageTitle } from 'src/app/interfaces/page-title';
import { PaginatorData } from 'src/app/interfaces/paginator-data';
import { NfesRow } from 'src/app/interfaces/tables/nfes-row';
import { NfesService } from 'src/app/services/nfes/nfes.service';
import { EditNfeComponent } from './dialogs/edit-nfe/edit-nfe.component';
import { NewNfeComponent } from './dialogs/new-nfe/new-nfe.component';

@Component({
  templateUrl: './nfes.component.html',
  styleUrls: ['./nfes.component.scss'],
})
export class NfesComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'paid',
    title: 'Gerir Notas Fiscais de Compra',
    searchLabel: 'Pesquisar por Fornecedor ou Número',
    searchBox: true,
    adjustButton: false,
  };

  tableData: NfesRow[] = [];
  page = 1;

  paginatorData: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  constructor(
    private dialog: MatDialog,
    private nfesService: NfesService,
    private route: ActivatedRoute
  ) {}

  openEditItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    rowData: NfesRow
  ): void {
    this.dialog.open(EditNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewNfeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getFormattedDate(dateTimeStr: string): string {
    const parts = dateTimeStr.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  getFormattedCnpj(cnpj: string): string {
    if (cnpj.length == 14) {
      const formattedCnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
      return formattedCnpj;
    } else {
      return 'CNPJ inválido';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.nfesService.listPerPage(this.page).subscribe((responseData) => {
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
