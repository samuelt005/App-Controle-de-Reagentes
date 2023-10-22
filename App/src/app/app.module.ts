import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryComponent } from './pages/history/history.component';
import { ListingComponent } from './pages/listing/listing.component';
import { LoginComponent } from './pages/login/login.component';
import { CommentaryComponent } from './shared/dialogs/commentary/commentary.component';
import { HeaderComponent } from './shared/header/header.component';
import { InfoCardComponent } from './shared/info-card/info-card.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AdjustmentComponent } from './shared/dialogs/adjustment/adjustment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListingComponent,
    SideBarComponent,
    HeaderComponent,
    InfoCardComponent,
    PaginatorComponent,
    HistoryComponent,
    CommentaryComponent,
    AdjustmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    NgIf,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
