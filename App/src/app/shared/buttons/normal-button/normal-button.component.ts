import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss']
})
export class NormalButtonComponent {
    @Input() filled: boolean = false;
    @Input() inactive: boolean = false;
    @Input() matRippleDisabled: boolean = false;
    @Input() customWidth: string = '150px';
}
