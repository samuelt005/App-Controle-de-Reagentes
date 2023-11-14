import { Component, Input } from '@angular/core';
import { Tags } from 'src/app/interfaces';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tags: Tags[] = [];

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
