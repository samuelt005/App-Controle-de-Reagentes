import { Component, Input } from '@angular/core';
import { Card } from 'src/app/interfaces';

@Component({
  selector: 'app-info-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class InfoCardComponent {
  // Atributos
  @Input() public card: Card = {
    iconColor: '',
    icon: '',
    title: '-',
    data: '-',
    isStatus: false,
  };

  public getStatus(status: string): string {
    const statusCode = parseInt(status);
    if (this.card.isStatus) {
      switch (statusCode) {
        case 1:
          return 'Aguardando Liberação';
        case 2:
          return 'Incompleto';
        case 3:
          return 'Concluído';
        default:
          return '-';
      }
    }
    return this.card.data;
  }

  public getStatusColor(status: string): string {
    const statusCode = parseInt(status);
    if (this.card.isStatus) {
      switch (statusCode) {
        case 1:
          return 'var(--aviso-2)';
        case 2:
          return 'var(--informativo-2)';
        case 3:
          return 'var(--sucesso-2)';
        default:
          return 'var(--base-preto)';
      }
    }
    return 'var(--base-preto)';
  }
}
