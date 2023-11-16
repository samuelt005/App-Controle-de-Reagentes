import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss'],
})
export class NormalButtonComponent {
  // Atributos
  @Input() public filled = false;
  @Input() public inactive = false;
  @Input() public matRippleDisabled = false;
  @Input() public customWidth = '150px';
  @Input() public disabled = false;
  @Input() public redColor = false;
}
