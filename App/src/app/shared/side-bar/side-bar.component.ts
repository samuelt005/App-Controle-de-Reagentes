import { Component, ElementRef, ViewChild } from '@angular/core';
import { filtersOptions } from 'src/app/interfaces/filters-option';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  menusDrawer: boolean = false;
  filtersDrawer: boolean = false;
  isChecked: boolean = false;

  filtersOptions: filtersOptions = {
    un: false,
    quantidade: false,
    vlr_unit: false,
    vlr_tot: false,
    tag: false,
    localizacao: false,
  };

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
}
