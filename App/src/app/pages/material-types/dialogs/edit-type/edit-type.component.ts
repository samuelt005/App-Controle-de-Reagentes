import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EditType } from "src/app/interfaces";

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent {
  typeData: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: EditType, private formBuilder: FormBuilder) {
    this.typeData = this.formBuilder.group({
      cod: injectedData.rowData.cod,
      desc: injectedData.rowData.descricao,
      localizacao: injectedData.rowData.loc_estoque,
      un: injectedData.rowData.un_de_medida.sigla,
    });
  }
}
