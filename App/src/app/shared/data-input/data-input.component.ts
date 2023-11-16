import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-inputs',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss'],
})
export class DataInputsComponent {
  // Atributos
  @Input() public noDeleteButton = false;
  @Output() public delete = new EventEmitter<void>();

  // Métodos
  public deleteThisSection() {
    this.delete.emit();
  }
}
