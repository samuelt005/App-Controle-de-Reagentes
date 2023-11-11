import { Component } from '@angular/core';
import { PageTitle } from 'src/app/interfaces';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent extends PageComponent {
  pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'description',
    title: 'Gerar Relatórios',
    searchBox: false,
    adjustButton: false,
  };
}
