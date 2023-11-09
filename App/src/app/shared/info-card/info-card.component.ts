import { Component, Input } from "@angular/core";
import { InfoCard } from "src/app/interfaces";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {
    @Input() card: InfoCard = {
        iconColor: '',
        icon: '',
        title: 'PLACEHOLDER',
        data: '-',
    }
}
