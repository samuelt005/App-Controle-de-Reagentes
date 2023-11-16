import { Component } from '@angular/core';
import { PageTitle } from 'src/app/interfaces';
import { PageComponent } from 'src/app/shared';

@Component({
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent extends PageComponent {
  // Atributos
  public pageTitle: PageTitle = {
    iconColor: 'var(--secundaria-2)',
    icon: 'description',
    title: 'Gerar Relatórios',
  };
}
