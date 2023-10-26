import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-inputs',
  templateUrl: './data-inputs.component.html',
  styleUrls: ['./data-inputs.component.scss'],
})
export class DataInputsComponent {
  @Input() noDeleteButton = false;
  @Output() delete = new EventEmitter<void>();

  deleteThisSection() {
    this.delete.emit();
  }
}
