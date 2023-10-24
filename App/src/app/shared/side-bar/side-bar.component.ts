import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filtersOptions } from 'src/app/interfaces/filters-option';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
    //TODO arrumar responsívidade
  menusDrawer: boolean = false;
  filtersDrawer: boolean = false;
  isChecked: boolean = false;
  @Input() filtersHidden: boolean = false;
  @Input() returnHidden: boolean = false;

  filtersOptions: filtersOptions = {
    un: false,
    quantidade: false,
    vlr_unit: false,
    vlr_tot: false,
    tag: false,
    localizacao: false,
  };

  constructor(private router: Router) {}

  toggleCheckbox(filterName: keyof filtersOptions) {
    this.filtersOptions[filterName] = !this.filtersOptions[filterName];
  }

  toggleMenusDrawer() {
    this.menusDrawer = !this.menusDrawer;
    if (this.filtersDrawer) {
      this.filtersDrawer = false;
    }
  }

  toggleFiltersDrawer() {
    this.filtersDrawer = !this.filtersDrawer;
    if (this.menusDrawer) {
      this.menusDrawer = false;
    }
  }

  returnPage() {
    this.router.navigate(['/listing']);
  }

  goToPage(page: string) {
    this.router.navigate([page]);
    this.toggleMenusDrawer();
  }
}
