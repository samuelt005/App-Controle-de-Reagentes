import { Component, Input } from '@angular/core';
import { NewTags } from 'src/app/interfaces/tables/new-tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tags: NewTags[] = [];

  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
