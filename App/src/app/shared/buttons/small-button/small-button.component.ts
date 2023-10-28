import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {
  @Input() inactive: boolean = false;
  @Input() matRippleDisabled: boolean = false;
  @Input() customWidth: string = '56px';
  @Input() redColor: boolean = false;
}
