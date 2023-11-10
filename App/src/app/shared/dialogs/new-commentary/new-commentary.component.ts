import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-new-commentary',
  templateUrl: './new-commentary.component.html',
  styleUrls: ['./new-commentary.component.scss'],
})
export class NewCommentaryComponent extends DialogComponent {}
