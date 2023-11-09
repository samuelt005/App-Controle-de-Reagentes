import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginComponent,
  ListingComponent,
  HistoryComponent,
  WriteOffComponent,
  RequestComponent,
  RequestListingComponent,
  ReportsComponent,
  MaterialTypesComponent,
  NfesComponent,
  SuppliersComponent,
  PurchaseLotsComponent,
  NotFoundComponent,
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
    path: 'listing/page/:page',
    component: ListingComponent,
  },
  {
    path: 'history/item/:id/page/:page',
    component: HistoryComponent,
  },
  {
    path: 'writeoff',
    component: WriteOffComponent,
  },
  {
    path: 'request',
    component: RequestComponent,
  },
  {
    path: 'requestlisting/page/:page',
    component: RequestListingComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'materialtypes/page/:page',
    component: MaterialTypesComponent,
  },
  {
    path: 'nfes/page/:page',
    component: NfesComponent,
  },
  {
    path: 'suppliers/page/:page',
    component: SuppliersComponent,
  },
  {
    path: 'purchaselots/page/:page',
    component: PurchaseLotsComponent,
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
