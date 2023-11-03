import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { ListingComponent } from './pages/listing/listing.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestListingComponent } from './pages/request-listing/request-listing.component';
import { RequestComponent } from './pages/request/request.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';
import { TestsComponent } from './pages/tests/tests.component';
import { MaterialTypesComponent } from './pages/material-types/material-types.component';
import { ReportsComponent } from './pages/reports/reports.component';

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
    path: 'history',
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
    path: 'requestlisting',
    component: RequestListingComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'materialtypes',
    component: MaterialTypesComponent,
  },
  {
    path: 'tests',
    component: TestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
