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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  LoginComponent,
  ListagemComponent,
  HistoricoComponent,
  AdjustmentComponent,
  DarBaixaComponent,
  SolicitarComponent,
  SolicitacoesComponent,
  DetalhesSolicitacaoComponent,
  AcceptComponent,
  EditItemComponent,
  TiposDeReagenteComponent,
  RelatoriosComponent,
  EditTagsComponent,
  NewTiposDeReagenteComponent,
  EditTiposDeReagenteComponent,
  ConfirmInactivationComponent,
  NfesComponent,
  NewNfeComponent,
  EditNfeComponent,
  NotFoundComponent,
  FornecedoresComponent,
  LotesDeCompraComponent,
  NewFornecedoresComponent,
  EditFornecedoresComponent,
  EditLotesDeCompraComponent,
  NewLotesDeCompraComponent,
} from './pages';
import {
  SidebarComponent,
  ProfileComponent,
  ChangePasswordComponent,
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
    ListagemComponent,
    SidebarComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HeaderComponent,
    InfoCardComponent,
    PaginatorComponent,
    HistoricoComponent,
    CommentaryComponent,
    AdjustmentComponent,
    DarBaixaComponent,
    DataInputsComponent,
    NewCommentaryComponent,
    ConfirmSaveComponent,
    SolicitarComponent,
    SolicitacoesComponent,
    DetalhesSolicitacaoComponent,
    AcceptComponent,
    EditItemComponent,
    NormalButtonComponent,
    IconButtonComponent,
    MenuOptionComponent,
    TiposDeReagenteComponent,
    RelatoriosComponent,
    SmallButtonComponent,
    EditTagsComponent,
    NewTiposDeReagenteComponent,
    EditTiposDeReagenteComponent,
    ConfirmInactivationComponent,
    TagsComponent,
    NfesComponent,
    NewNfeComponent,
    EditNfeComponent,
    NotFoundComponent,
    FornecedoresComponent,
    LotesDeCompraComponent,
    NewFornecedoresComponent,
    EditFornecedoresComponent,
    SnackbarComponent,
    NewLotesDeCompraComponent,
    EditLotesDeCompraComponent,
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
    MatProgressSpinnerModule,
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
