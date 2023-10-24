import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersOptions } from 'src/app/interfaces/filters-option';
import { MenuOptions } from 'src/app/interfaces/menu-options';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  role: number = 1; //TODO remover depois
  //TODO arrumar responsívidade
  menusDrawer: boolean = false;
  filtersDrawer: boolean = false;
  isChecked: boolean = false;
  @Input() filtersHidden: boolean = false;

  menuOptions: MenuOptions[] = [
    {
      title: 'Cadastrar Baixa',
      page: '/writeoff',
      authorized: [1, 2, 3]
    },
    {
      title: 'Solicitar Compra',
      page: '/request',
      authorized: [1, 2]
    },
    {
      title: 'Solicitações de Compra',
      page: '/requestlisting',
      authorized: [1]
    },
    {
      title: 'Gerar Relatórios',
      page: '',
      authorized: [1]
    },
    {
      title: 'Registro de Materiais',
      page: '',
      authorized: [1]
    },
  ];

  filtersOptions: FiltersOptions = {
    un: false,
    quantidade: false,
    vlr_unit: false,
    vlr_tot: false,
    tag: false,
    localizacao: false,
  };

  constructor(private router: Router) {}

  getRoleName(role: number) {
    switch (role) {
      case 1:
        return 'Administrador';

      case 2:
        return 'Professor';
        
      case 3:
        return 'Aluno';

      default:
        return 'PLACEHOLDER';
    }
  }

  toggleCheckbox(filterName: keyof FiltersOptions) {
    this.filtersOptions[filterName] = !this.filtersOptions[filterName];
  }

  toggleMenusDrawer() {
    this.menusDrawer = !this.menusDrawer;
    console.log(this.menusDrawer);
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
    setTimeout(() => {
      this.router.navigate(['/listing']);
    }, 500);
  }

  goToPage(page: string) {
    setTimeout(() => {
      this.router.navigate([page]);
    }, 500);
    this.toggleMenusDrawer();
  }

  logOut() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
