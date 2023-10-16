import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PageTitle } from 'src/app/interfaces/page-title';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() pageTitle: PageTitle = {
        iconColor: '',
        icon: '',
        title: 'PLACEHOLDER',
    };
}
