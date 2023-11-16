import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss'],
})
export class SmallButtonComponent {
  // Atributos
  @Input() public inactive = false;
  @Input() public matRippleDisabled = false;
  @Input() public customWidth = '56px';
  @Input() public redColor = false;
}
