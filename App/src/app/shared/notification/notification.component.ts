import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { NotificationData } from 'src/app/interfaces';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  // Construtor
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private snackRef: MatSnackBarRef<unknown>
  ) {
    this.message = data.message;
    this.description = data.description;
    this.warning = data.warning;
  }

  // Atributos
  public warning = false;
  public message = '';
  public description: string | null = null;

  // Métodos

  public dismissNotification() {
    setTimeout(() => {
      this.snackRef.dismiss();
    }, 200);
  }
}
