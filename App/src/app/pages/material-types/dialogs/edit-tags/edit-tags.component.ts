import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss']
})
export class EditTagsComponent implements OnInit {
  tagsOptions: FormGroup;

  isTagPresent(tagSigla: string): boolean {
    return this.injectedData.tags.some((tag) => tag.sigla === tagSigla);
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: { tags: { sigla: string }[] }, private formBuilder: FormBuilder) {
    this.tagsOptions = this.formBuilder.group({
      em: this.isTagPresent('em'),
      pf: this.isTagPresent('pf'),
      pc: this.isTagPresent('pc'),
      eb: this.isTagPresent('eb'),
    });
  }

  ngOnInit() {
    console.log(JSON.stringify(this.injectedData))
  }
}
