import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {
  @Input() inactive = false;
  @Input() matRippleDisabled = false;
  @Input() customWidth = '56px';
  @Input() redColor = false;
}
