import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListingComponent } from './pages/listing/listing.component';
import { HistoryComponent } from './pages/history/history.component';
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
