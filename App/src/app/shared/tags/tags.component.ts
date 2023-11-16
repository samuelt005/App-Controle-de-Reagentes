import { Component, Input } from '@angular/core';
import { Tag } from 'src/app/interfaces';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  // Atributos
  @Input() public tags: Tag[] = [];

  // Métodos
  public getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
