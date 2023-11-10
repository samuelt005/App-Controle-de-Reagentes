import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss'],
})
export class EditTagsComponent extends DialogComponent {
  tagsOptions: FormGroup;

  isTagPresent(tagSigla: string): boolean {
    return this.injectedData.tags.some((tag) => tag.sigla === tagSigla);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: { tags: { sigla: string }[] },
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.tagsOptions = this.formBuilder.group({
      em: this.isTagPresent('em'),
      pf: this.isTagPresent('pf'),
      pc: this.isTagPresent('pc'),
      eb: this.isTagPresent('eb'),
    });
  }
}
