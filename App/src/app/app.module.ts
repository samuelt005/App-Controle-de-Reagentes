import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdjustmentComponent } from './pages/history/adjustment/adjustment.component';
import { HistoryComponent } from './pages/history/history.component';
import { ListingComponent } from './pages/listing/listing.component';
import { LoginComponent } from './pages/login/login.component';
import { EditTagsComponent } from './pages/material-types/dialogs/edit-tags/edit-tags.component';
import { EditTypeComponent } from './pages/material-types/dialogs/edit-type/edit-type.component';
import { NewTypeComponent } from './pages/material-types/dialogs/new-type/new-type.component';
import { MaterialTypesComponent } from './pages/material-types/material-types.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RequestListingComponent } from './pages/request-listing/request-listing.component';
import { RequestComponent } from './pages/request/request.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';
import { IconButtonComponent } from './shared/buttons/icon-button/icon-button.component';
import { NormalButtonComponent } from './shared/buttons/normal-button/normal-button.component';
import { SmallButtonComponent } from './shared/buttons/small-button/small-button.component';
import { DataInputsComponent } from './shared/data-inputs/data-inputs.component';
import { CommentaryComponent } from './shared/dialogs/commentary/commentary.component';
import { ConfirmSaveComponent } from './shared/dialogs/confirm-save/confirm-save.component';
import { NewCommentaryComponent } from './shared/dialogs/new-commentary/new-commentary.component';
import { HeaderComponent } from './shared/header/header.component';
import { InfoCardComponent } from './shared/info-card/info-card.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { MenuOptionComponent } from './shared/side-bar/menu-option/menu-option.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { ConfirmInactivationComponent } from './pages/material-types/dialogs/confirm-inactivation/confirm-inactivation.component';
import { TagsComponent } from './shared/tags/tags.component';
import { NfesComponent } from './pages/nfes/nfes.component';
import { SuppliersLotsComponent } from './pages/suppliers-lots/suppliers-lots.component';
import { NewNfeComponent } from './pages/nfes/dialogs/new-nfe/new-nfe.component';
import { EditNfeComponent } from './pages/nfes/dialogs/edit-nfe/edit-nfe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
    WriteOffComponent,
    DataInputsComponent,
    NewCommentaryComponent,
    ConfirmSaveComponent,
    RequestComponent,
    RequestListingComponent,
    NormalButtonComponent,
    IconButtonComponent,
    MenuOptionComponent,
    MaterialTypesComponent,
    ReportsComponent,
    SmallButtonComponent,
    EditTagsComponent,
    NewTypeComponent,
    EditTypeComponent,
    ConfirmInactivationComponent,
    TagsComponent,
    NfesComponent,
    SuppliersLotsComponent,
    NewNfeComponent,
    EditNfeComponent,
    NotFoundComponent
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
    MatRippleModule,
    MatSelectModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
