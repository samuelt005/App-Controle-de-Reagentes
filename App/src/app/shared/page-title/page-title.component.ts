import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class HeaderComponent {
  // Construtor
  constructor(public dialog: MatDialog) {}

  // Atributos
  @Input() public pageTitle: PageTitle = {
    iconColor: '',
    icon: '',
    title: 'PLACEHOLDER',
  };

  public searchInput = '';
  public id: number | null = null;
}
