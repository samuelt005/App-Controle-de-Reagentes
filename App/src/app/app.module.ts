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
import {
  LoginComponent,
  ListingComponent,
  HistoryComponent,
  AdjustmentComponent,
  WriteOffComponent,
  RequestComponent,
  RequestListingComponent,
  MaterialTypesComponent,
  ReportsComponent,
  EditTagsComponent,
  NewTypeComponent,
  EditTypeComponent,
  ConfirmInactivationComponent,
  NfesComponent,
  NewNfeComponent,
  EditNfeComponent,
  NotFoundComponent,
  SuppliersComponent,
  PurchaseLotsComponent,
} from './pages';
import {
  SideBarComponent,
  HeaderComponent,
  InfoCardComponent,
  PaginatorComponent,
  CommentaryComponent,
  DataInputsComponent,
  NewCommentaryComponent,
  ConfirmSaveComponent,
  NormalButtonComponent,
  IconButtonComponent,
  MenuOptionComponent,
  SmallButtonComponent,
  TagsComponent,
} from './shared';

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
    NewNfeComponent,
    EditNfeComponent,
    NotFoundComponent,
    SuppliersComponent,
    PurchaseLotsComponent,
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
