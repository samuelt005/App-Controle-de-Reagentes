import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss']
})
export class EditTagsComponent {
  tagsOptions: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private _formBuilder: FormBuilder) {
    this.tagsOptions = this._formBuilder.group({
      em: injectedData.tags.em,
      pf: injectedData.tags.pf,
      pc: injectedData.tags.pc,
      eb: injectedData.tags.eb,
    });
  }
}
