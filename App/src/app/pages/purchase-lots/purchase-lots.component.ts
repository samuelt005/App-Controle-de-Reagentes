import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PageTitle, PurchaseLotsRow } from "src/app/interfaces";
import { PurchaseLotsService } from "src/app/services";
import { PageComponent } from "src/app/shared";
import { NewPurchaseLotComponent } from "./dialogs/new-purchase-lot/new-purchase-lot.component";
import { EditPurchaseLotComponent } from "./dialogs/edit-purchase-lot/edit-purchase-lot.component";

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

  lotsTableData: PurchaseLotsRow[] = [];

  constructor(
    public dialog: MatDialog,
    private lotsService: PurchaseLotsService,
    private route: ActivatedRoute
  ) {
    super();
  }

  openEditItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    rowData: PurchaseLotsRow
  ): void {
    this.dialog.open(EditPurchaseLotComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { rowData },
    });
  }

  openNewItem(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewPurchaseLotComponent, {
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
