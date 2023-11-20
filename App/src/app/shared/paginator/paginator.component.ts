import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorData } from 'src/app/interfaces';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  // Construtor
  constructor(private router: Router) {}

  // Atributos
  @Input() public data: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };

  public minItem = 0;
  public maxItem = 0;

  // Métodos
  public goToPage(button: string) {
    const { currentPage, totalItems } = this.data;

    if (button === 'back' && currentPage > 1) {
      this.navigateAndSetPage(currentPage - 1);
    } else if (button === 'forward' && currentPage * 20 < totalItems) {
      this.navigateAndSetPage(currentPage + 1);
    }
  }

  private navigateAndSetPage(newPage: number) {
    const currentRoute: string = this.router.routerState.snapshot.url;
    const updatedRoute = currentRoute.replace(/\/(\d+)$/, '/' + newPage);
    this.router.navigate([updatedRoute]);
    this.data.currentPage = newPage;
  }

  private calculateMinMaxItems() {
    const { currentPage, totalItems } = this.data;

    if (totalItems < 20) {
      this.maxItem = totalItems;
      if (this.data.totalItems !== 0) {
        this.minItem = 1;
      }
    } else {
      this.minItem = (currentPage - 1) * 20 + 1;
      this.maxItem = currentPage * 20;
      if (this.maxItem > totalItems) {
        this.maxItem = totalItems;
      }
    }
    if (totalItems === 0) {
      this.minItem = 0;
      this.maxItem = 0;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.calculateMinMaxItems();
    }
  }
}
