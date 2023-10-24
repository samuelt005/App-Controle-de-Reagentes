import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { ListingComponent } from './pages/listing/listing.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestListingComponent } from './pages/request-listing/request-listing.component';
import { RequestComponent } from './pages/request/request.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'listing',
        component: ListingComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'writeoff',
        component: WriteOffComponent
    },
    {
        path: 'request',
        component: RequestComponent
    },
    {
        path: 'requestlisting',
        component: RequestListingComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
