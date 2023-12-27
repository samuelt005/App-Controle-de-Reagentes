import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarData } from 'src/app/interfaces';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  // Construtor
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {
    if (!data.error && !data.message) {
      this.message = 'Salvo com sucesso.';
    } else if (data.error && !data.message) {
      this.error = true;
      this.message = 'Erro ao salvar. Tente novamente.';
    } else {
      this.error = data.error;
      this.message = data.message;
    }
  }

  // Atributos
  public error = false;
  public message = '';
}
