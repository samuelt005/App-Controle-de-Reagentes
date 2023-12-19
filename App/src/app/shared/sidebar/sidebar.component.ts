import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FiltersValue, MenuOption, UserData } from 'src/app/interfaces';
import { UserService } from 'src/app/services';
import { ProfileComponent } from './dialogs/profile/profile.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // Construtor
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    const userData = this.userService.getUserData();
    if (userData !== null) {
      this.roleName = userData.perfil;
      this.userData = userData;
    }
  }

  // Atributos
  public roleName = '';
  public menusDrawer = false;
  public filtersDrawer = false;
  public isChecked = false;
  private userData: UserData | null = null;
  @Input() public filtersHidden = false;
  @Output() filterEvent = new EventEmitter<FiltersValue>();

  public filtersInputs: FiltersValue = {
    un: null,
    tag: null,
    qtdMin: null,
    qtdMax: null,
    vlrUnitMin: null,
    vlrUnitMax: null,
    vlrTotMin: null,
    vlrTotMax: null,
    loc: null,
  };

  public menuOptions: MenuOption[] = [
    {
      title: 'Cadastrar Baixa',
      page: '/cadastrarbaixa',
      authorized: ['Administrador', 'Professor', 'Aluno'],
    },
    {
      title: 'Solicitar Compra',
      page: '/solicitarcompra',
      authorized: ['Administrador', 'Professor'],
    },
    {
      title: 'Solicitações de Compra',
      page: '/solicitacoes/page/1',
      authorized: ['Administrador'],
    },
    {
      title: 'Gerar Relatórios',
      page: '/relatorios',
      authorized: ['Administrador'],
    },
    {
      title: 'Registro de Materiais',
      page: '/tiposdereagentes/page/1',
      authorized: ['Administrador'],
    },
    {
      title: 'Notas Fiscais',
      page: 'nfes/page/1',
      authorized: ['Administrador'],
    },
    {
      title: 'Fornecedores',
      page: 'fornecedores/page/1',
      authorized: ['Administrador'],
    },
    {
      title: 'Lotes de Compra',
      page: 'lotesdecompra/page/1',
      authorized: ['Administrador'],
    },
  ];

  // Métodos
  public toggleMenusDrawer() {
    this.menusDrawer = !this.menusDrawer;
    if (this.filtersDrawer) {
      this.filtersDrawer = false;
    }
  }

  public toggleFiltersDrawer() {
    this.filtersDrawer = !this.filtersDrawer;
    if (this.menusDrawer) {
      this.menusDrawer = false;
    }
  }

  public returnPage() {
    const currentPage = this.router.url;
    setTimeout(() => {
      if (currentPage.includes('/solicitacao/')) {
        this.router.navigate(['/solicitacoes/page/1']);
      } else {
        this.router.navigate(['/listagem/page/1']);
      }
    }, 500);
  }

  public goToPage(page: string) {
    setTimeout(() => {
      this.router.navigate([page]);
    }, 500);
    this.toggleMenusDrawer();
  }

  public logOut() {
    this.userService.logout();
  }

  public applyFilters() {
    const filtersValue = { ...this.filtersInputs };
    const { qtdMin, qtdMax, un } = this.filtersInputs;

    switch (un) {
      case 'l':
        if (qtdMin) {
          filtersValue.qtdMin = qtdMin * 1000;
        }
        if (qtdMax) {
          filtersValue.qtdMax = qtdMax * 1000;
        }
        break;
      case 'mg':
        if (qtdMin) {
          filtersValue.qtdMin = qtdMin * 0.001;
        }
        if (qtdMax) {
          filtersValue.qtdMax = qtdMax * 0.001;
        }
        break;
      case 'kg':
        if (qtdMin) {
          filtersValue.qtdMin = qtdMin * 1000;
        }
        if (qtdMax) {
          filtersValue.qtdMax = qtdMax * 1000;
        }
        break;
      default:
        break;
    }

    this.filterEvent.emit(filtersValue);
  }

  public cleanFilters() {
    this.filtersInputs.un = '';
    this.filtersInputs.tag = '';
    this.filtersInputs.qtdMin = null;
    this.filtersInputs.qtdMax = null;
    this.filtersInputs.vlrUnitMin = null;
    this.filtersInputs.vlrUnitMax = null;
    this.filtersInputs.vlrTotMin = null;
    this.filtersInputs.vlrTotMax = null;
    this.filtersInputs.loc = '';
  }

  public openProfile(
    userData = this.userData,
    enterAnimationDuration = '100ms',
    exitAnimationDuration = '100ms'
  ): void {
    this.dialog.open(ProfileComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: userData,
    });
  }

  public ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }
  }
}
