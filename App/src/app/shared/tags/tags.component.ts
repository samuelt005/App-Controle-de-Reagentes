import { Component, Input } from '@angular/core';
import { Tags } from 'src/app/interfaces/tables/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tags: Tags = {};

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
