import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { ListingComponent } from './pages/listing/listing.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestListingComponent } from './pages/request-listing/request-listing.component';
import { RequestComponent } from './pages/request/request.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';
import { MaterialTypesComponent } from './pages/material-types/material-types.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NfesComponent } from './pages/nfes/nfes.component';
import { SuppliersLotsComponent } from './pages/suppliers-lots/suppliers-lots.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
    path: 'supplierslots/page/:page1&:page2',
    component: SuppliersLotsComponent,
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
