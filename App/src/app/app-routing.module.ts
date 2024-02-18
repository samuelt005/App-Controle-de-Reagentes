import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  ListagemComponent,
  HistoricoComponent,
  DarBaixaComponent,
  SolicitarComponent,
  SolicitacoesComponent,
  RelatoriosComponent,
  TiposDeReagenteComponent,
  NfesComponent,
  FornecedoresComponent,
  LotesDeCompraComponent,
  NotFoundComponent,
  DetalhesSolicitacaoComponent,
  CadastrarSeComponent,
  ConfirmarEmailComponent,
  UsuariosComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarSeComponent,
  },
  {
    path: 'confirmaremail/:id',
    component: ConfirmarEmailComponent,
  },
  {
    path: 'listagem/page/:page',
    component: ListagemComponent,
  },
  {
    path: 'historico/item/:id/page/:page',
    component: HistoricoComponent,
  },
  {
    path: 'cadastrarbaixa',
    component: DarBaixaComponent,
  },
  {
    path: 'solicitarcompra',
    component: SolicitarComponent,
  },
  {
    path: 'solicitacoes/page/:page',
    component: SolicitacoesComponent,
  },
  {
    path: 'solicitacao/:id',
    component: DetalhesSolicitacaoComponent,
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent,
  },
  {
    path: 'tiposdereagentes/page/:page',
    component: TiposDeReagenteComponent,
  },
  {
    path: 'nfes/page/:page',
    component: NfesComponent,
  },
  {
    path: 'fornecedores/page/:page',
    component: FornecedoresComponent,
  },
  {
    path: 'lotesdecompra/page/:page',
    component: LotesDeCompraComponent,
  },
  {
    path: 'usuarios/page/:page',
    component: UsuariosComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
