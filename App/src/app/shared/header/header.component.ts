import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageTitle } from 'src/app/interfaces/page-title';
import { AdjustmentComponent } from '../dialogs/adjustment/adjustment.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() pageTitle: PageTitle = {
    iconColor: '',
    icon: '',
    title: 'PLACEHOLDER',
    searchBox: false,
    adjustButton: false,
  };

  constructor(public dialog: MatDialog) {}

  openAdjustment(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AdjustmentComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
