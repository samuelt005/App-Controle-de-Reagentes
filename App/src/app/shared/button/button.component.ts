import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() filled: boolean = false;
    @Input() inactive: boolean = false;
    @Input() customWidth: string = '150px';
}
