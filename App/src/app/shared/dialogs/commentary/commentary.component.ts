import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss'],
})
export class CommentaryComponent {
  // Construtor
  constructor(@Inject(MAT_DIALOG_DATA) public commentary: string) {}
}
