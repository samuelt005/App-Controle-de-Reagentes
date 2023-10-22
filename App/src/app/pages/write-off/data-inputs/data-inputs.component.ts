import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-inputs',
  templateUrl: './data-inputs.component.html',
  styleUrls: ['./data-inputs.component.scss']
})
export class DataInputsComponent {

    @Output() delete = new EventEmitter<void>();

    deleteThisSection() {
      this.delete.emit();
    }
}
