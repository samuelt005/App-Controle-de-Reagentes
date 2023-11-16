import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOption } from 'src/app/interfaces';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // Construtor
  constructor(private router: Router, private userService: UserService) {}

  // Atributos
  public role = 1; //TODO remover depois
  //TODO arrumar responsívidade
  public menusDrawer = false;
  public filtersDrawer = false;
  public isChecked = false;
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
      authorized: [1, 2, 3],
    },
    {
      title: 'Solicitar Compra',
      page: '/solicitarcompra',
      authorized: [1, 2],
    },
    {
      title: 'Solicitações de Compra',
      page: '/solicitacoes/page/1',
      authorized: [1],
    },
    {
      title: 'Gerar Relatórios',
      page: '/relatorios',
      authorized: [1],
    },
    {
      title: 'Registro de Materiais',
      page: '/tiposdereagentes/page/1',
      authorized: [1],
    },
    {
      title: 'Notas Fiscais',
      page: 'nfes/page/1',
      authorized: [1],
    },
    {
      title: 'Fornecedores',
      page: 'fornecedores/page/1',
      authorized: [1],
    },
    {
      title: 'Lotes de Compra',
      page: 'lotesdecompra/page/1',
      authorized: [1],
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
  public getRoleName(role: number) {
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

  public ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.router.navigate(['/login']);
    }
  }
}
