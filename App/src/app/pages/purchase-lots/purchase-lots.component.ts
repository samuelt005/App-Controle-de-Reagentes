import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PageTitle, LotsRow, ListingRow } from "src/app/interfaces";
import { LotsService } from "src/app/services";
import { EditTypeComponent } from "../material-types/dialogs/edit-type/edit-type.component";
import { NewTypeComponent } from "../material-types/dialogs/new-type/new-type.component";
import { PageComponent } from "src/app/shared";

@Component({
  templateUrl: './purchase-lots.component.html',
  styleUrls: ['./purchase-lots.component.scss'],
})
export class PurchaseLotsComponent extends PageComponent implements OnInit {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'shopping_bag',
    title: 'Gerir Lotes de Compra',
    searchLabel: 'Pesquisar por Lote',
    searchBox: true,
    adjustButton: false,
  };

  lotsTableData: LotsRow[] = [];

  constructor(
    public dialog: MatDialog,
    private lotsService: LotsService,
    private route: ActivatedRoute
  ) {
    super();
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

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewTypeComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      this.lotsService.listPerPage(this.page).subscribe((responseData) => {
        const { currentPage, totalPages, totalItems } = responseData;
        this.paginatorData = {
          currentPage: currentPage,
          totalPages: totalPages,
          totalItems: totalItems,
        };
        this.lotsTableData = responseData.data;
      });
    });
  }
}
