import { Component, OnChanges, Input, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { PaginatorData } from "src/app/interfaces";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() data: PaginatorData = {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  };
  
  minItem = 0;
  maxItem = 0;

  constructor(private router: Router) {}

  goToPage(button: string) {
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

  calculateMinMaxItems() {
    const { currentPage, totalItems } = this.data;
    
    if (totalItems < 20) {
      this.maxItem = totalItems;
      this.minItem = 1;
    } else {
      this.minItem = (currentPage - 1) * 20 + 1;
      this.maxItem = currentPage * 20;
      if (this.maxItem > totalItems) {
        this.maxItem = totalItems;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.calculateMinMaxItems();
    }
  }
}
