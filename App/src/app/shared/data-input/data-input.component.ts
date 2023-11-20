import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoDeReagente, UnDeMedida } from 'src/app/interfaces';

@Component({
  selector: 'app-data-inputs',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss'],
})
export class DataInputsComponent {
  // Atributos
  @Input() public noDeleteButton = false;
  @Input() public unsSelectData: UnDeMedida[] = [];
  @Input() public tiposSelectData: TipoDeReagente[] = [];
  @Output() public delete = new EventEmitter<void>();

  public form = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    qtd: new FormControl('', [Validators.required]),
    peso_un: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });

  selected = '';

  // Métodos
  public deleteThisSection() {
    this.delete.emit();
  }
}
