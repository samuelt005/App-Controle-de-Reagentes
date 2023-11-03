import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { PaginatorService } from 'src/app/services/paginator/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() isHomePage: boolean = false;
  @Input() page: number = 1;
  @Input() table: string = '';

  totalRows: number = 0;
  minItem: number = (this.page - 1) * 20 + 1;
  maxItem: number = 0;

  constructor(private service: PaginatorService, private router: Router) {}

  goToPage(button: string) {
    if (button === 'back' && this.page > 1) {
      this.navigateAndSetPage(this.page - 1);
    } else if (button === 'forward' && this.page * 20 < this.totalRows) {
      this.navigateAndSetPage(this.page + 1);
    }
  }

  private navigateAndSetPage(newPage: number) {
    const currentRoute: string = this.router.routerState.snapshot.url;
    const updatedRoute = currentRoute.replace(/\/(\d+)$/, '/' + newPage);
    this.router.navigate([updatedRoute]);
    this.page = newPage; // Atualiza o número da página
  }

  calculateMinMaxItems() {
    if (this.totalRows < 20) {
      this.maxItem = this.totalRows;
      this.minItem = 1;
    } else {
      this.minItem = (this.page - 1) * 20 + 1;
      this.maxItem = this.page * 20;
      if (this.maxItem > this.totalRows) {
        this.maxItem = this.totalRows;
      }
    }
  }

  ngOnInit(): void {
    if (this.isHomePage) {
      this.service.getActiveTypesCount().subscribe((data) => {
        this.totalRows = parseInt(data);
        this.calculateMinMaxItems();
      });
    } else {
      this.service.getItemsCount(this.table).subscribe((data) => {
        this.totalRows = parseInt(data);
        this.calculateMinMaxItems();
      });
    }
  }
}
