import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuOption, UserData } from 'src/app/interfaces';
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
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
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

  public filtersValue = {
    un: '',
    tag: '',
    qtdMin: null,
    qtdMax: null,
    vlrUnitMin: null,
    vlrUnitMax: null,
    vlrTotMin: null,
    vlrTotMax: null,
    loc: '',
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

  public filtersOptions = {
    un: false,
    quantidade: false,
    vlr_unit: false,
    vlr_tot: false,
    tag: false,
    localizacao: false,
  };

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
    setTimeout(() => {
      this.router.navigate(['/listagem/page/1']);
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
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

  public applyFilters() {
    this.cleanFilters();
  }

  public cleanFilters() {
    this.filtersValue.un = '';
    this.filtersValue.tag = '';
    this.filtersValue.qtdMin = null;
    this.filtersValue.qtdMax = null;
    this.filtersValue.vlrUnitMin = null;
    this.filtersValue.vlrUnitMax = null;
    this.filtersValue.vlrTotMin = null;
    this.filtersValue.vlrTotMax = null;
    this.filtersValue.loc = '';
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
