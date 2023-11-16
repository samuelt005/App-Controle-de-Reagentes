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
    title: 'PLACEHOLDER',
    data: '-',
  };
}
