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
  @Input() public isFirstItem = false;
  @Input() public unsSelectData: UnDeMedida[] = [];
  @Input() public tiposSelectData: TipoDeReagente[] = [];
  @Input() public form: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    qtd_mov: new FormControl('', [Validators.required]),
    peso_un: new FormControl('', [Validators.required]),
    comentario: new FormControl('', [Validators.required]),
  });

  @Output() public delete = new EventEmitter<void>();

  // Métodos
  public deleteThisSection() {
    this.delete.emit();
  }
}
