import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
  NewSupplierComponent,
  EditSupplierComponent,
  EditPurchaseLotComponent,
  NewPurchaseLotComponent,
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
  SnackbarComponent,
} from './shared';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

export const CUSTOM_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    NewSupplierComponent,
    EditSupplierComponent,
    SnackbarComponent,
    NewPurchaseLotComponent,
    EditPurchaseLotComponent,
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    DatePipe,
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMAT },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
