import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Commentary } from "src/app/interfaces";

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Commentary) {
      console.log(data)
    }
}
