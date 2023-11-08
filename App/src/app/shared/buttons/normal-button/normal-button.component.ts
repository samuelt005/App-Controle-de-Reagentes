import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss']
})
export class NormalButtonComponent {
    @Input() filled = false;
    @Input() inactive = false;
    @Input() matRippleDisabled = false;
    @Input() customWidth = '150px';
}
